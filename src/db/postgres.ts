import postgres from "postgres"

import { getDatabaseUrl, getPostgresPoolMax } from "./config"

const databaseUrl = getDatabaseUrl()

export function createPostgresClient(options?: { max?: number }) {
  const max =
    options?.max !== undefined && Number.isFinite(options.max)
      ? options.max
      : getPostgresPoolMax()

  return postgres(databaseUrl, {
    max,
    prepare: false,
  })
}
