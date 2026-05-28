import "server-only"

import { drizzle } from "drizzle-orm/postgres-js"

import * as schema from "@/db/schema"

import { createPostgresClient } from "./postgres"

export { createPostgresClient } from "./postgres"

export const queryClient = createPostgresClient()

export const db = drizzle(queryClient, { schema })

export type Database = typeof db
