export const DEFAULT_POSTGRES_POOL_MAX = 10

function parsePoolSize(value: string | undefined, fallback: number): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to initialize Postgres")
  }

  return databaseUrl
}

export function getPostgresPoolMax(fallback = DEFAULT_POSTGRES_POOL_MAX): number {
  return parsePoolSize(process.env.POSTGRES_POOL_MAX, fallback)
}
