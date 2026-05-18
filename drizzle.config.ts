import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

import { defineConfig } from "drizzle-kit"

function hydrateDatabaseUrlFromEnvFiles() {
  const envFiles = [".env.local", ".env"]

  for (const envFile of envFiles) {
    const filePath = resolve(process.cwd(), envFile)
    if (!existsSync(filePath)) continue

    const lines = readFileSync(filePath, "utf8").split("\n")
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const [key, ...valueParts] = trimmed.split("=")
      if (key !== "DATABASE_URL") continue

      const rawValue = valueParts.join("=").trim()
      const value = rawValue.replace(/^['\"]|['\"]$/g, "")
      if (value) {
        process.env.DATABASE_URL = value
        return
      }
    }
  }
}

if (!process.env.DATABASE_URL) {
  hydrateDatabaseUrlFromEnvFiles()
}

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set (env or .env/.env.local) to run Drizzle migrations"
  )
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: databaseUrl,
  },
  strict: true,
})
