/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a throwaway build run alongside `npm run dev` without clobbering the
  // dev server's .next directory:  NEXT_DIST_DIR=.next-verify npm run build
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/services/health-wellness-services',
        destination: 'https://www.agemanagementmed.com/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
