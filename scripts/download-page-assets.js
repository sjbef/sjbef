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

    // 1. First, search for figures (WordPress block editor images/galleries with captions)
    const figureRegex = /<figure[^>]*>([\s\S]*?)<\/figure>/gi;
    let match;
    const processedUrls = new Set();

    while ((match = figureRegex.exec(html)) !== null) {
      const figureContent = match[1];
      
      // Find img src
      const imgMatch = /<img[^>]+src=["']([^"']+)["']/i.exec(figureContent);
      if (imgMatch) {
        const src = imgMatch[1];
        
        // Find alt text
        const altMatch = /alt=["']([^"']*)["']/i.exec(figureContent);
        const alt = altMatch ? altMatch[1] : '';

        // Find caption inside figcaption
        const figcaptionMatch = /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i.exec(figureContent);
        const caption = figcaptionMatch ? stripHtml(figcaptionMatch[1]) : '';

        processedUrls.add(src);
        assetsFound.push({
          src,
          alt,
          caption,
          context: 'figure_block'
        });
      }
    }

    // 2. Search for older WP caption structures: <div class="wp-caption ...">
    const wpCaptionRegex = /<div[^>]+class=["'][^"']*wp-caption[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
    while ((match = wpCaptionRegex.exec(html)) !== null) {
      const divContent = match[1];
      const imgMatch = /<img[^>]+src=["']([^"']+)["']/i.exec(divContent);
      if (imgMatch) {
        const src = imgMatch[1];
        if (processedUrls.has(src)) continue;

        const altMatch = /alt=["']([^"']*)["']/i.exec(divContent);
        const alt = altMatch ? altMatch[1] : '';

        const pMatch = /<p[^>]+class=["'][^"']*wp-caption-text[^"']*["'][^>]*>([\s\S]*?)<\/p>/i.exec(divContent);
        const caption = pMatch ? stripHtml(pMatch[1]) : '';

        processedUrls.add(src);
        assetsFound.push({
          src,
          alt,
          caption,
          context: 'wp_caption_div'
        });
      }
    }

    // 3. Find any remaining standalone image tags that we missed
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    while ((match = imgRegex.exec(html)) !== null) {
      const fullImgTag = match[0];
      const src = match[1];
      
      // Skip if already processed, or if it's a tiny tracking pixel / generic icon
      if (processedUrls.has(src)) continue;
      if (src.includes('avatar') || src.includes('gravatar') || src.startsWith('data:image')) continue;

      const altMatch = /alt=["']([^"']*)["']/i.exec(fullImgTag);
      const alt = altMatch ? altMatch[1] : '';

      // Standalone images don't have explicit captions, look for a title attribute
      const titleMatch = /title=["']([^"']*)["']/i.exec(fullImgTag);
      const caption = titleMatch ? titleMatch[1] : '';

      processedUrls.add(src);
      assetsFound.push({
        src,
        alt,
        caption,
        context: 'standalone_img'
      });
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
      const originalUrl = img.src;

      // Clean up URL parameters (e.g., resize args) to get clean filenames
      const cleanUrl = originalUrl.split('?')[0];
      const originalFilename = path.basename(cleanUrl);
      
      // Generate a descriptive, sanitized local filename prepended by page ID
      const fileExt = path.extname(cleanFilename(originalFilename)) || '.png';
      const baseName = path.basename(originalFilename, fileExt);
      const sanitizedFilename = `page-${page.id}-${i + 1}-${cleanFilename(baseName)}${fileExt}`;
      const destPath = path.join(OUTPUT_DIR, sanitizedFilename);

      console.log(`📥 [${i + 1}/${images.length}] Downloading: ${originalFilename}`);
      const success = await downloadFile(originalUrl, destPath);

      if (success) {
        allDownloadedAssets.push({
          pageId: page.id,
          pageUrl: page.url,
          filename: sanitizedFilename,
          originalUrl,
          localUrl: `/page-assets/${sanitizedFilename}`,
          altText: img.alt,
          caption: img.caption,
          context: img.context
        });
      }
    }
  }

  // Write the rich manifest file containing paths, captions, and pages
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(allDownloadedAssets, null, 2));
  console.log(`\n========================================`);
  console.log(`✨ Success! Downloaded ${allDownloadedAssets.length} total images.`);
  console.log(`📝 Asset manifest saved to: ${MANIFEST_PATH}`);
  console.log(`========================================`);
}

function cleanFilename(name) {
  return name.replace(/[^a-zA-Z0-9.-]/g, '_');
}

main();
