/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.crimevision24.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.banglastarnews.com',
      },
      {
        protocol: 'http',
        hostname: 'admin.banglastarnews.com',
      },

    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://admin.banglastarnews.com/api/v1/:path*",

      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
