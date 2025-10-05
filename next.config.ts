import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
    ignoreDuringBuilds: true, // ⬅️ hace que ESLint NO bloquee el build
  },
};

export default nextConfig;
