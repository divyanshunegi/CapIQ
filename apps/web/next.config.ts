import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Temporarily ignore ESLint during builds due to deprecated options in Next.js 15
    // ESLint will still run in development and via `next lint`
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ensure TypeScript errors are caught during build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
