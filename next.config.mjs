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
  // Base path and asset prefix for GitHub Pages (username.github.io/repo)
  basePath: '/tts-webui-extension-catalog',
  assetPrefix: '/tts-webui-extension-catalog/',
  // Export as a static site suitable for GitHub Pages
  output: 'export',
  // Ensure routes end with a trailing slash which works better on static hosts
  trailingSlash: true,
}

export default nextConfig