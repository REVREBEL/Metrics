import nextEnv from "@next/env"

nextEnv.loadEnvConfig(process.cwd())

const { createPostgresClient } = await import("./postgres")
const sql = createPostgresClient({ max: 1 })

try {
  const hotels = await sql`SELECT property_code, name, market FROM hotel_profiles`
  console.log("Hotel Profiles:", JSON.stringify(hotels, null, 2))

  const statuses = await sql`SELECT code, label FROM hotel_task_statuses ORDER BY sort_order`
  console.log("Task Statuses:", JSON.stringify(statuses, null, 2))

  const camps = await sql`SELECT name, status FROM campaigns`
  console.log("Campaigns:", JSON.stringify(camps, null, 2))

  const dlt = await sql`SELECT table_name, display_name FROM data_library_tables ORDER BY table_name`
  console.log("Data Library Tables:", JSON.stringify(dlt, null, 2))

  const tmpl = await sql`SELECT name FROM strategy_templates`
  console.log("Strategy Templates:", JSON.stringify(tmpl, null, 2))
} finally {
  await sql.end()
  process.exit(0)
}
