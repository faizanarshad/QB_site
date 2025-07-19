const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Starting build process...');

try {
  // Check if DATABASE_URL is available
  if (!process.env.DATABASE_URL) {
    console.log('⚠️  DATABASE_URL not found, using dummy URL for Prisma generation');
    process.env.DATABASE_URL = 'postgresql://dummy:dummy@localhost:5432/dummy';
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