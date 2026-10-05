import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot: fileURLToPath(new URL("../..", import.meta.url)),
  transpilePackages: ["@healthalyst/ui"],
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
