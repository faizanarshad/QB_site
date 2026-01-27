const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Starting build process...');

try {
  // Check if qbrix_DATABASE_URL (or DATABASE_URL) is available
  const dbUrl = process.env.qbrix_DATABASE_URL || process.env.DATABASE_URL;
  if (!dbUrl) {
    console.log('⚠️  qbrix_DATABASE_URL / DATABASE_URL not found, using dummy URL for Prisma generation');
    process.env.qbrix_DATABASE_URL = 'postgresql://dummy:dummy@localhost:5432/dummy';
  }

  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Build Next.js
  console.log('🏗️  Building Next.js application...');
  execSync('npx next build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 