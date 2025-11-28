import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    // Allow loading images from the backend and common CDNs used by music APIs
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/countries",
        destination: "http://localhost:3000/countries", // Nest
      },
    ];
  },
};

export default nextConfig;
