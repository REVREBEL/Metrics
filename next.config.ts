import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*"],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig;