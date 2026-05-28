import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
typescript: {
    // Temporarily ignore errors during dev; remove when baseline is clean.
    ignoreBuildErrors: process.env.VERCEL_ENV === "development" ? true : false,
  },
    "/*": ["./registry/**/*"],
  },
  allowedDevOrigins: ["*.replit.dev", "*.worf.replit.dev", "*.repl.co"],
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig;