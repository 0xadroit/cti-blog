/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Hostinger: Run 'npm run build:static' which sets STATIC_EXPORT=true
  // For Vercel: Run 'npm run build' (Vercel handles Next.js natively)
  ...(process.env.STATIC_EXPORT === 'true' && { output: 'export' }),
  trailingSlash: true, // Add trailing slashes for consistent URL routing
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
