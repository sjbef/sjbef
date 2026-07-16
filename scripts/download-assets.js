import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target WordPress site API URL
const WP_API_URL = 'https://www.sjbef.org/wp-json/wp/v2/media';

// Directory to store downloaded assets and manifest
const OUTPUT_DIR = path.join(__dirname, '../public/original-assets');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'assets_manifest.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function downloadFile(url, destPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP status ${response.status}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.promises.writeFile(destPath, buffer);
    return true;
  } catch (error) {
    console.error(`Failed to download ${url}:`, error.message);
    return false;
  }
}

async function fetchAllMedia() {
  let page = 1;
  let allMedia = [];
  let hasMore = true;

  console.log('Fetching media library details from Saint-Jean-Baptiste Educational Foundation WP REST API...');

  while (hasMore) {
    try {
      const url = `${WP_API_URL}?per_page=100&page=${page}`;
      const response = await fetch(url);
      
      if (response.status === 400) {
        // WordPress returns 400 when page exceeds total pages
        hasMore = false;
        break;
      }

      if (!response.ok) {
        throw new Error(`WordPress API returned status ${response.status}`);
      }

      const mediaItems = await response.json();
      if (!mediaItems || mediaItems.length === 0) {
        hasMore = false;
        break;
      }

      allMedia = allMedia.concat(mediaItems);
      console.log(`Fetched page ${page} (${mediaItems.length} items)...`);
      page++;
    } catch (error) {
      console.error(`Error on page ${page}:`, error.message);
      hasMore = false;
    }
  }

  console.log(`\nFound a total of ${allMedia.length} media assets.`);
  return allMedia;
}

async function main() {
  const mediaItems = await fetchAllMedia();
  const manifest = [];

  for (let i = 0; i < mediaItems.length; i++) {
    const item = mediaItems[i];
    const sourceUrl = item.source_url;
    if (!sourceUrl) continue;

    // Extract file name
    const originalFilename = path.basename(sourceUrl);
    // Sanitize filename to avoid weird character issues
    const sanitizedFilename = `${item.id}-${originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const destPath = path.join(OUTPUT_DIR, sanitizedFilename);

    console.log(`[${i + 1}/${mediaItems.length}] Downloading ${originalFilename}...`);
    const success = await downloadFile(sourceUrl, destPath);

    if (success) {
      // Reconstruct and store rich context/metadata
      manifest.push({
        id: item.id,
        filename: sanitizedFilename,
        originalUrl: sourceUrl,
        localUrl: `/original-assets/${sanitizedFilename}`,
        title: item.title?.rendered || '',
        altText: item.alt_text || '',
        caption: item.caption?.rendered?.replace(/<[^>]*>/g, '').trim() || '', // raw stripped html
        captionHtml: item.caption?.rendered || '',
        description: item.description?.rendered?.replace(/<[^>]*>/g, '').trim() || '',
        uploadDate: item.date,
        mimeType: item.mime_type,
        dimensions: item.media_details ? {
          width: item.media_details.width,
          height: item.media_details.height
        } : null
      });
    }
  }

  // Write manifest index
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nSuccess! Downloaded ${manifest.length} files successfully.`);
  console.log(`Saved structured asset metadata and captions to ${MANIFEST_PATH}`);
}

main();
