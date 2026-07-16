import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target pages to extract images from
const TARGET_PAGES = [
  { id: '228', url: 'https://www.sjbef.org/?page_id=228' },
  { id: '966', url: 'https://www.sjbef.org/?page_id=966' }
];

// Output directories
const OUTPUT_DIR = path.join(__dirname, '../public/page-assets');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'page_assets_manifest.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to download a binary file
async function downloadFile(url, destPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP status ${response.status}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.promises.writeFile(destPath, buffer);
    return true;
  } catch (error) {
    console.error(`  ❌ Failed to download ${url}:`, error.message);
    return false;
  }
}

// Clean HTML tags from strings
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Reconstruct the full-resolution original image URL from WordPress thumbnail format
function deThumbnailUrl(url) {
  if (!url) return '';
  // WordPress appends suffix like -300x225 or -150x150 before file extension
  return url.replace(/-(\d+)x(\d+)(\.[a-zA-Z0-9]+)(\?.*)?$/i, (match, w, h, ext, query) => {
    return ext + (query || '');
  });
}

async function scrapePageImages(pageId, pageUrl) {
  console.log(`\n----------------------------------------`);
  console.log(`🌐 Fetching page ID ${pageId}: ${pageUrl}`);
  console.log(`----------------------------------------`);

  try {
    const response = await fetch(pageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch page HTML: status ${response.status}`);
    }
    const html = await response.text();
    const assetsFound = [];
    const processedUrls = new Set(); // Keep track of unique high-res URLs

    // Helper to register an asset safely
    const registerAsset = (fullUrl, thumbUrl, alt, caption, context) => {
      if (!fullUrl || !thumbUrl) return;
      
      // Clean URLs
      const cleanFull = fullUrl.trim();
      const cleanThumb = thumbUrl.trim();

      // Avoid avatars, icons, trackers, or duplicates
      if (cleanFull.includes('avatar') || cleanFull.includes('gravatar') || cleanFull.startsWith('data:image')) return;
      if (processedUrls.has(cleanFull)) return;

      processedUrls.add(cleanFull);
      assetsFound.push({
        fullUrl: cleanFull,
        thumbUrl: cleanThumb,
        alt: alt || '',
        caption: caption || '',
        context
      });
    };

    // 1. Process all WordPress figure blocks (<figure>...</figure>)
    const figureRegex = /<figure[^>]*>([\s\S]*?)<\/figure>/gi;
    let match;
    while ((match = figureRegex.exec(html)) !== null) {
      const content = match[1];
      
      // Try to find a link wrapped img first (high-resolution image)
      const aImgMatch = /<a[^>]+href=["']([^"']+\.(?:jpe?g|png|gif|webp|bmp))["'][^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i.exec(content);
      
      let fullUrl = '';
      let thumbUrl = '';
      
      if (aImgMatch) {
        fullUrl = aImgMatch[1];
        thumbUrl = aImgMatch[2];
      } else {
        const imgMatch = /<img[^>]+src=["']([^"']+)["']/i.exec(content);
        if (imgMatch) {
          thumbUrl = imgMatch[1];
          fullUrl = deThumbnailUrl(thumbUrl);
        }
      }

      if (fullUrl && thumbUrl) {
        const altMatch = /alt=["']([^"']*)["']/i.exec(content);
        const alt = altMatch ? altMatch[1] : '';

        const figcaptionMatch = /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i.exec(content);
        const caption = figcaptionMatch ? stripHtml(figcaptionMatch[1]) : '';

        registerAsset(fullUrl, thumbUrl, alt, caption, 'figure_block');
      }
    }

    // 2. Process all older WordPress caption structures: <div class="wp-caption">...</div>
    const wpCaptionRegex = /<div[^>]+class=["'][^"']*wp-caption[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
    while ((match = wpCaptionRegex.exec(html)) !== null) {
      const content = match[1];

      const aImgMatch = /<a[^>]+href=["']([^"']+\.(?:jpe?g|png|gif|webp|bmp))["'][^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i.exec(content);
      
      let fullUrl = '';
      let thumbUrl = '';

      if (aImgMatch) {
        fullUrl = aImgMatch[1];
        thumbUrl = aImgMatch[2];
      } else {
        const imgMatch = /<img[^>]+src=["']([^"']+)["']/i.exec(content);
        if (imgMatch) {
          thumbUrl = imgMatch[1];
          fullUrl = deThumbnailUrl(thumbUrl);
        }
      }

      if (fullUrl && thumbUrl) {
        const altMatch = /alt=["']([^"']*)["']/i.exec(content);
        const alt = altMatch ? altMatch[1] : '';

        const pMatch = /<p[^>]+class=["'][^"']*wp-caption-text[^"']*["'][^>]*>([\s\S]*?)<\/p>/i.exec(content);
        const caption = pMatch ? stripHtml(pMatch[1]) : '';

        registerAsset(fullUrl, thumbUrl, alt, caption, 'wp_caption_div');
      }
    }

    // 3. Process standalone linked images: <a> wrapping an <img>
    const aImgGlobalRegex = /<a[^>]+href=["']([^"']+\.(?:jpe?g|png|gif|webp|bmp))["'][^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/gi;
    while ((match = aImgGlobalRegex.exec(html)) !== null) {
      const fullUrl = match[1];
      const thumbUrl = match[2];

      const startIndex = match.index;
      const subHtml = html.substring(startIndex, startIndex + 1000);
      const aTagEndMatch = /<\/a>/i.exec(subHtml);
      const fullATagText = aTagEndMatch ? subHtml.substring(0, aTagEndMatch.index + 4) : subHtml;

      const altMatch = /alt=["']([^"']*)["']/i.exec(fullATagText);
      const alt = altMatch ? altMatch[1] : '';

      const titleMatch = /title=["']([^"']*)["']/i.exec(fullATagText);
      const caption = titleMatch ? titleMatch[1] : '';

      registerAsset(fullUrl, thumbUrl, alt, caption, 'linked_img_standalone');
    }

    // 4. Process any remaining standalone <img> tags
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    while ((match = imgRegex.exec(html)) !== null) {
      const fullImgTag = match[0];
      const thumbUrl = match[1];
      const fullUrl = deThumbnailUrl(thumbUrl);

      const altMatch = /alt=["']([^"']*)["']/i.exec(fullImgTag);
      const alt = altMatch ? altMatch[1] : '';

      const titleMatch = /title=["']([^"']*)["']/i.exec(fullImgTag);
      const caption = titleMatch ? titleMatch[1] : '';

      registerAsset(fullUrl, thumbUrl, alt, caption, 'standalone_img');
    }

    console.log(`Found ${assetsFound.length} unique images on page ID ${pageId}`);
    return assetsFound;

  } catch (error) {
    console.error(`🚨 Error parsing page ${pageUrl}:`, error.message);
    return [];
  }
}

async function main() {
  const allDownloadedAssets = [];

  for (const page of TARGET_PAGES) {
    const images = await scrapePageImages(page.id, page.url);
    
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const originalUrl = img.fullUrl; // Download the FULL resolution image!

      // Clean up URL parameters to get a clean file name
      const cleanUrl = originalUrl.split('?')[0];
      const originalFilename = path.basename(cleanUrl);
      
      // Generate a descriptive, sanitized local filename
      const fileExt = path.extname(cleanFilename(originalFilename)) || '.png';
      const baseName = path.basename(originalFilename, fileExt);
      const sanitizedFilename = `page-${page.id}-${i + 1}-${cleanFilename(baseName)}${fileExt}`;
      const destPath = path.join(OUTPUT_DIR, sanitizedFilename);

      console.log(`📥 [${i + 1}/${images.length}] Downloading high-res: ${originalFilename}`);
      const success = await downloadFile(originalUrl, destPath);

      if (success) {
        allDownloadedAssets.push({
          pageId: page.id,
          pageUrl: page.url,
          filename: sanitizedFilename,
          originalUrl,
          thumbUrl: img.thumbUrl,
          localUrl: `/page-assets/${sanitizedFilename}`,
          altText: img.altText || img.alt,
          caption: img.caption,
          context: img.context
        });
      }
    }
  }

  // Write the rich manifest file containing paths, captions, and pages
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(allDownloadedAssets, null, 2));
  console.log(`\n========================================`);
  console.log(`✨ Success! Downloaded ${allDownloadedAssets.length} total high-resolution images.`);
  console.log(`📝 Asset manifest saved to: ${MANIFEST_PATH}`);
  console.log(`========================================`);
}

function cleanFilename(name) {
  return name.replace(/[^a-zA-Z0-9.-]/g, '_');
}

main();
