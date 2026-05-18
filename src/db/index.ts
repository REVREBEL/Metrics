import "server-only"

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "@/db/schema"

import { getDatabaseUrl, getPostgresPoolMax } from "./config"

const databaseUrl = getDatabaseUrl()

export function createPostgresClient(options?: { max?: number }) {
  const max = Number.isFinite(options?.max) ? options.max! : getPostgresPoolMax()

  return postgres(databaseUrl, {
    max,
    prepare: false,
  })
}

export const queryClient = createPostgresClient()

export const db = drizzle(queryClient, { schema })

export type Database = typeof db
