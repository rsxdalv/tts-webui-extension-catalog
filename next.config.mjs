/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Export as a static site suitable for GitHub Pages
  output: 'export',
  // Ensure routes end with a trailing slash which works better on static hosts
  trailingSlash: true,
}

export default nextConfig