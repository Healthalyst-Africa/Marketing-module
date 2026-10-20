import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */

const nextConfiguration = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot: fileURLToPath(new URL("../..", import.meta.url)),
  transpilePackages: ["@healthalyst/ui", "@healthalyst/icons"],
  typescript: {
    ignoreBuildErrors: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfiguration;
