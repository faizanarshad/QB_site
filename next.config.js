/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  output: 'standalone'
}

module.exports = nextConfig 