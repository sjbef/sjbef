import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, '../public/images/gallery');

// Allowed image extensions
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

function getAllFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getAllFiles(name, filesList);
    } else {
      const ext = path.extname(name).toLowerCase();
      if (IMAGE_EXTS.includes(ext)) {
        filesList.push(name);
      }
    }
  }
  return filesList;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stats = fs.statSync(filePath);
  const sizeBeforeKB = Math.round(stats.size / 1024);

  // Skip files that are already very small (under 100KB)
  if (sizeBeforeKB < 100) {
    return { skipped: true, sizeBeforeKB };
  }

  const tempFilePath = filePath + '.tmp';
  
  try {
    let pipeline = sharp(filePath);
    
    // Resize image to max 1000px width or height, preserving aspect ratio, only if it's larger
    pipeline = pipeline.resize({
      width: 1000,
      height: 1000,
      fit: 'inside',
      withoutEnlargement: true
    });

    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: 80 });
    }

    await pipeline.toFile(tempFilePath);
    
    // Replace original file with compressed file
    fs.renameSync(tempFilePath, filePath);
    
    const sizeAfterKB = Math.round(fs.statSync(filePath).size / 1024);
    return { skipped: false, sizeBeforeKB, sizeAfterKB };
  } catch (err) {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    console.error(`❌ Error compressing ${path.basename(filePath)}:`, err.message);
    return { error: true };
  }
}

async function main() {
  if (!fs.existsSync(GALLERY_DIR)) {
    console.error(`🚨 Error: Gallery directory not found at ${GALLERY_DIR}`);
    process.exit(1);
  }

  console.log('🔍 Scanning gallery for images...');
  const files = getAllFiles(GALLERY_DIR);
  console.log(`📸 Found ${files.length} images. Starting compression...`);

  let totalBefore = 0;
  let totalAfter = 0;
  let compressedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const relativePath = path.relative(GALLERY_DIR, file);
    const result = await compressImage(file);
    
    if (result.error) {
      continue;
    }

    if (result.skipped) {
      skippedCount++;
      totalBefore += result.sizeBeforeKB;
      totalAfter += result.sizeBeforeKB;
    } else {
      compressedCount++;
      totalBefore += result.sizeBeforeKB;
      totalAfter += result.sizeAfterKB;
      const reduction = Math.round(((result.sizeBeforeKB - result.sizeAfterKB) / result.sizeBeforeKB) * 100);
      console.log(`⚡ [${i + 1}/${files.length}] Compressed ${relativePath}: ${result.sizeBeforeKB}KB -> ${result.sizeAfterKB}KB (-${reduction}%)`);
    }
  }

  const overallReduction = totalBefore > 0 ? Math.round(((totalBefore - totalAfter) / totalBefore) * 100) : 0;
  console.log('\n==================================================');
  console.log(`🎉 Compression Completed!`);
  console.log(`📁 Total images: ${files.length}`);
  console.log(`📦 Compressed: ${compressedCount}`);
  console.log(`⏭️ Skipped (already small): ${skippedCount}`);
  console.log(`📉 Total Gallery Size before: ${(totalBefore / 1024).toFixed(2)} MB`);
  console.log(`📈 Total Gallery Size after:  ${(totalAfter / 1024).toFixed(2)} MB`);
  console.log(`💥 Total size reduction:      ${((totalBefore - totalAfter) / 1024).toFixed(2)} MB (-${overallReduction}%)`);
  console.log('==================================================\n');
}

main();
