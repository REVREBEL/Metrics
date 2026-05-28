import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*"],
  },
  allowedDevOrigins: ["*.replit.dev", "*.worf.replit.dev", "*.repl.co"],
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig;