#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🖼️  Image Optimization Script');
console.log('============================');

// Check if hero image exists and get its size
const heroImagePath = path.join(__dirname, '../../public/images/hero/theme.webp');

if (fs.existsSync(heroImagePath)) {
  const stats = fs.statSync(heroImagePath);
  const sizeInKB = Math.round(stats.size / 1024);
  
  console.log(`📊 Current hero image size: ${sizeInKB}KB`);
  
  if (sizeInKB > 100) {
    console.log('⚠️  Hero image is too large! This is likely causing slow LCP.');
    console.log('💡 Recommendations:');
    console.log('   1. Compress the image to under 100KB');
    console.log('   2. Use WebP format with 85% quality');
    console.log('   3. Consider using a smaller image for mobile');
    console.log('   4. Add proper image optimization attributes');
  } else {
    console.log('✅ Hero image size is good!');
  }
} else {
  console.log('❌ Hero image not found!');
}

// Check other large images
const imagesDir = path.join(__dirname, '../../public/images');
const largeImages = [];

function checkImageSizes(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      checkImageSizes(filePath);
    } else if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
      const sizeInKB = Math.round(stat.size / 1024);
      if (sizeInKB > 200) {
        largeImages.push({
          path: filePath.replace(imagesDir, ''),
          size: sizeInKB
        });
      }
    }
  });
}

checkImageSizes(imagesDir);

if (largeImages.length > 0) {
  console.log('\n📋 Large images found (>200KB):');
  largeImages.forEach(img => {
    console.log(`   ${img.path}: ${img.size}KB`);
  });
  console.log('\n💡 Consider optimizing these images for better performance.');
} else {
  console.log('\n✅ All images are reasonably sized!');
}

console.log('\n🎯 LCP Optimization Tips:');
console.log('   1. Use priority loading for hero images');
console.log('   2. Implement proper image sizing');
console.log('   3. Use WebP format with compression');
console.log('   4. Add blur placeholders');
console.log('   5. Preload critical images');
console.log('   6. Use responsive images with sizes attribute'); 