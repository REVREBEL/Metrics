import { writeFileSync, existsSync, readFileSync } from "fs"

const publishableKey =
  process.env.CLERK_PUBLISHABLE_KEY ||
  process.env.VITE_CLERK_PUBLISHABLE_KEY ||
  ""
const secretKey = process.env.CLERK_SECRET_KEY || ""

const lines = []

if (publishableKey) {
  lines.push(`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${publishableKey}`)
}
if (secretKey) {
  lines.push(`CLERK_SECRET_KEY=${secretKey}`)
}

if (lines.length > 0) {
  writeFileSync(".env.local", lines.join("\n") + "\n")
  console.log("[env] .env.local written with Clerk keys")
} else {
  console.warn("[env] Warning: No Clerk keys found in environment")
}
