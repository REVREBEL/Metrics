import { execFileSync } from "node:child_process"

export const DEFAULT_POSTGRES_POOL_MAX = 10

const ONE_PASSWORD_URI_PREFIX = "op://"

function parsePoolSize(value: string | undefined, fallback: number): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL

  if (databaseUrl) {
    return resolveOnePasswordReference(databaseUrl, "DATABASE_URL")
  }

  return buildDatabaseUrlFromParts()
}

export function getPostgresPoolMax(fallback = DEFAULT_POSTGRES_POOL_MAX): number {
  return parsePoolSize(process.env.POSTGRES_POOL_MAX, fallback)
}

function buildDatabaseUrlFromParts(): string {
  const database = getRequiredEnv("DATABASE_DB")
  const host = process.env.DATABASE_HOST ?? process.env.DATABASE_IP
  const user = getRequiredEnv("DATABASE_USER")
  const password = resolveOnePasswordReference(
    getRequiredEnv("DATABASE_PASSWORD"),
    "DATABASE_PASSWORD"
  )
  const port = process.env.DATABASE_PORT ?? "5432"

  if (!host) {
    throw new Error("DATABASE_HOST is required to initialize Postgres")
  }

  const url = new URL(`postgresql://${host}:${port}/${database}`)
  url.username = user
  url.password = password

  return url.toString()
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(
      `${name} is required to initialize Postgres when DATABASE_URL is not set`
    )
  }

  return value
}

function resolveOnePasswordReference(
  valueOrReference: string,
  envName: string
): string {
  if (!valueOrReference.startsWith(ONE_PASSWORD_URI_PREFIX)) {
    return valueOrReference
  }

  try {
    return execFileSync("op", ["read", valueOrReference], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim()
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    throw new Error(
      `Failed to resolve ${envName} with 1Password CLI. Run "op signin" and try again. ${message}`
    )
  }
}
