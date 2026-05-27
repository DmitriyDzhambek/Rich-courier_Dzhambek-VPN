import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Vercel will detect this as a Next.js project
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
