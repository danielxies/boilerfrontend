/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Disable error overlay
  onError: () => {},
  // Disable React strict mode for the demo
  reactStrictMode: false,
  // Configure image optimization
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  // Ensure public assets are accessible
  assetPrefix: '',
  basePath: '',
}

module.exports = nextConfig 