/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      }

    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://admin.banglastar.com/api/v1/:path*",

      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
