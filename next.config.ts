import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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
