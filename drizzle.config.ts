import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { loadEnvFile } from "node:process"

import { defineConfig } from "drizzle-kit"
import { getDatabaseUrl } from "./src/db/config"

for (const envFile of [".env.local", ".env"]) {
  if (existsSync(resolve(process.cwd(), envFile))) {
    loadEnvFile(envFile)
  }
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
  strict: true,
})
