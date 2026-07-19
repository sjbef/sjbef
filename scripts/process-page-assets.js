import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const PAGE_ASSETS_DIR = path.join(PUBLIC_DIR, 'page-assets');
const MANIFEST_PATH = path.join(PAGE_ASSETS_DIR, 'page_assets_manifest.json');
const GALLERY_DIR = path.join(PUBLIC_DIR, 'images/gallery');

function getExt(filename) {
  return path.extname(filename).toLowerCase();
}

function cleanBaseName(filename) {
  const ext = getExt(filename);
  const nameWithoutExt = path.basename(filename, path.extname(filename));
  
  // Remove page-###-###- prefix
  let cleaned = nameWithoutExt.replace(/^page-\d+-\d+-/, '');
  
  // Convert to lowercase
  cleaned = cleaned.toLowerCase();
  
  // Replace non-alphanumeric (except hyphen and dot) with hyphen
  cleaned = cleaned.replace(/[^a-z0-9.-]/g, '-');
  
  // Remove consecutive hyphens
  cleaned = cleaned.replace(/-+/g, '-');
  
  // Remove leading/trailing hyphens
  cleaned = cleaned.replace(/^-+|-+$/g, '');
  
  return cleaned + ext;
}

function extractYear(item) {
  // 1. Try from originalUrl WordPress upload path (e.g., uploads/2025/07/)
  const wpYearMatch = /\/uploads\/(\d{4})\//.exec(item.originalUrl || '');
  if (wpYearMatch) {
    return wpYearMatch[1];
  }
  
  // 2. Try from caption
  const yearRegex = /\b(20\d{2})\b/;
  const captionMatch = yearRegex.exec(item.caption || '');
  if (captionMatch) {
    return captionMatch[1];
  }
  
  // 3. Try from filename
  const filenameMatch = yearRegex.exec(item.filename || '');
  if (filenameMatch) {
    return filenameMatch[1];
  }
  
  // Fallback
  return '2023';
}

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`🚨 Error: Manifest file not found at ${MANIFEST_PATH}`);
    process.exit(1);
  }

  console.log('🔄 Loading manifest...');
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const processedManifest = [];

  console.log(`🚀 Processing ${manifest.length} assets...`);

  for (const item of manifest) {
    const originalFilename = item.filename;
    const sourceFilePath = path.join(PAGE_ASSETS_DIR, originalFilename);

    if (!fs.existsSync(sourceFilePath)) {
      console.warn(`⚠️ Source file not found: ${sourceFilePath}, skipping...`);
      continue;
    }

    // Determine category
    const isGrant = item.pageId === '966';
    const category = isGrant ? 'grants' : 'scholarships';
    
    // Extract year
    const year = extractYear(item);

    // Determine target directory
    const targetSubdir = path.join(GALLERY_DIR, category, year);
    if (!fs.existsSync(targetSubdir)) {
      fs.mkdirSync(targetSubdir, { recursive: true });
    }

    // Generate sanitized unique filename
    const candidateName = cleanBaseName(originalFilename);
    const ext = getExt(candidateName);
    const baseWithoutExt = path.basename(candidateName, ext);

    let finalFilename = candidateName;
    let targetFilePath = path.join(targetSubdir, finalFilename);
    let counter = 1;

    while (fs.existsSync(targetFilePath)) {
      finalFilename = `${baseWithoutExt}-${counter}${ext}`;
      targetFilePath = path.join(targetSubdir, finalFilename);
      counter++;
    }

    // Copy file
    console.log(`📁 Copying: ${originalFilename} -> ${category}/${year}/${finalFilename}`);
    fs.copyFileSync(sourceFilePath, targetFilePath);

    // Build updated manifest item
    processedManifest.push({
      ...item,
      filename: finalFilename,
      year: year,
      localUrl: `/images/gallery/${category}/${year}/${finalFilename}`
    });
  }

  // Overwrite manifest with the new clean URLs and year metadata
  console.log(`📝 Writing updated manifest containing clean paths and year metadata...`);
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(processedManifest, null, 2));

  // Clean up original image files from PAGE_ASSETS_DIR
  console.log('🧹 Cleaning up original temporary files from page-assets/ directory...');
  const filesInAssetsDir = fs.readdirSync(PAGE_ASSETS_DIR);
  let cleanedCount = 0;
  for (const file of filesInAssetsDir) {
    if (file !== 'page_assets_manifest.json') {
      const filePath = path.join(PAGE_ASSETS_DIR, file);
      fs.unlinkSync(filePath);
      cleanedCount++;
    }
  }

  console.log(`✨ Success! Cleaned up ${cleanedCount} files from /public/page-assets/`);
  console.log('✅ Asset migration completed successfully!');
}

main();
