import "server-only"

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to initialize the Postgres client")
}

const maxConnections = Number(process.env.POSTGRES_POOL_MAX ?? 10)

export const queryClient = postgres(databaseUrl, {
  max: Number.isFinite(maxConnections) ? maxConnections : 10,
  prepare: false,
})

export const db = drizzle(queryClient, { schema })

export type Database = typeof db
