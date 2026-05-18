import "server-only"

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "@/db/schema"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to initialize the Postgres client")
}

const queryClient = postgres(databaseUrl, {
  max: Number(process.env.POSTGRES_POOL_MAX ?? 10),
  prepare: false,
})

export const db = drizzle(queryClient, { schema })

export type Database = typeof db
export { queryClient }
