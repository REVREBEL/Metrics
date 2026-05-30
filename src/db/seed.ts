import nextEnv from "@next/env"

nextEnv.loadEnvConfig(process.cwd())

const { sql } = await import("drizzle-orm")
const { drizzle } = await import("drizzle-orm/postgres-js")

const schema = await import("@/db/schema")
const {
  campaigns,
  dataLibraryTables,
  propertyProfiles,
  propertyTaskStatuses,
  strategyTemplates,
} = schema

const { createPostgresClient } = await import("./postgres")

const queryClient = createPostgresClient({ max: 1 })
const db = drizzle(queryClient, { schema })

// DOMAIN NAMING RULE: seed data must use canonical property terminology.
// Do not add hotel-prefixed app entities here unless mirroring a vendor/source-system field.
const dataLibrarySeedTables = [
  {
    tableName: "metrics_core.dim_property",
    displayName: "Property Directory",
    description: "Property dimension used for property profile alignment.",
    uiMetadata: {
      status: "ready",
      approximateRowCount: 100,
      lastUpdated: "2026-05-18T08:15:00.000Z",
      lastRefreshed: "2026-05-18T08:15:00.000Z",
    },
  },
  {
    tableName: "metrics_core.lkp_segment",
    displayName: "Segment Lookup",
    description: "Canonical segment definitions.",
    uiMetadata: { status: "ready", approximateRowCount: 25, lastUpdated: "2026-05-18T08:15:00.000Z", lastRefreshed: "2026-05-18T08:15:00.000Z" },
  },
  {
    tableName: "metrics_core.map_segment",
    displayName: "Segment Mapping",
    description: "Maps source-system segment values to canonical segment values.",
    uiMetadata: { status: "draft", approximateRowCount: 250, lastUpdated: "2026-05-18T08:15:00.000Z", lastRefreshed: "2026-05-18T08:15:00.000Z" },
  },
  {
    tableName: "metrics_core.map_roomtype",
    displayName: "Room Type Mapping",
    description: "Maps PMS room types to standardized room types.",
    uiMetadata: { status: "draft", approximateRowCount: 80, lastUpdated: "2026-05-18T08:15:00.000Z", lastRefreshed: "2026-05-18T08:15:00.000Z" },
  },
  {
    tableName: "metrics_core.lkp_channel",
    displayName: "Channel Lookup",
    description: "Canonical channel definitions for reporting and mapping.",
    uiMetadata: { status: "ready", approximateRowCount: 20, lastUpdated: "2026-05-18T08:15:00.000Z", lastRefreshed: "2026-05-18T08:15:00.000Z" },
  },
  {
    tableName: "metrics_core.map_source",
    displayName: "Source Mapping",
    description: "Maps source/subsource values to canonical source/channel.",
    uiMetadata: { status: "needs_review", approximateRowCount: 400, lastUpdated: "2026-05-18T08:15:00.000Z", lastRefreshed: "2026-05-18T08:15:00.000Z" },
  },
  {
    tableName: "metrics_core.map_rate",
    displayName: "Rate Mapping",
    description: "Maps raw rate codes to canonical rate dimensions.",
    uiMetadata: { status: "needs_review", approximateRowCount: 500, lastUpdated: "2026-05-18T08:15:00.000Z", lastRefreshed: "2026-05-18T08:15:00.000Z" },
  },
  {
    tableName: "metrics_core.lkp_event_category",
    displayName: "Event Category Lookup",
    description: "Standard event category labels for demand events.",
    uiMetadata: { status: "ready", approximateRowCount: 15, lastUpdated: "2026-05-18T08:15:00.000Z", lastRefreshed: "2026-05-18T08:15:00.000Z" },
  },
  {
    tableName: "metrics_core.lkp_event_impact",
    displayName: "Event Impact Lookup",
    description: "Event impact scoring definitions.",
    uiMetadata: { status: "ready", approximateRowCount: 10, lastUpdated: "2026-05-18T08:15:00.000Z", lastRefreshed: "2026-05-18T08:15:00.000Z" },
  },
]

export async function seedAppStateFoundation() {
  const [insertedProperty] = await db
    .insert(propertyProfiles)
    .values({
      propertyCode: "DEMO_001",
      name: "Demo Property",
      market: "Austin",
      timezone: "America/Chicago",
      profileData: { tier: "pilot" },
    })
    .onConflictDoUpdate({
      target: propertyProfiles.propertyCode,
      set: {
        name: "Demo Property",
        market: "Austin",
        timezone: "America/Chicago",
        profileData: { tier: "pilot" },
      },
    })
    .returning({ id: propertyProfiles.id })

  await db
    .insert(propertyTaskStatuses)
    .values([
      { code: "todo", label: "To Do", sortOrder: 10 },
      { code: "in_progress", label: "In Progress", sortOrder: 20 },
      { code: "blocked", label: "Blocked", sortOrder: 30 },
      { code: "done", label: "Done", sortOrder: 40 },
    ])
    .onConflictDoNothing({ target: propertyTaskStatuses.code })

  const property =
    insertedProperty ??
    (await db.query.propertyProfiles.findFirst({
      where: (table, { eq }) => eq(table.propertyCode, "DEMO_001"),
      columns: { id: true },
    }))

  if (property) {
    await db
      .insert(campaigns)
      .values({
        propertyId: property.id,
        name: "Demo Campaign",
        status: "draft",
        metadata: { source: "seed" },
      })
      .onConflictDoNothing()
  }

  await db
    .insert(dataLibraryTables)
    .values(dataLibrarySeedTables)
    .onConflictDoUpdate({
      target: dataLibraryTables.tableName,
      set: {
        displayName: sql`excluded.display_name`,
        description: sql`excluded.description`,
        uiMetadata: sql`excluded.ui_metadata`,
      },
    })

  await db
    .insert(strategyTemplates)
    .values({
      name: "Weekly Revenue Check-In",
      description:
        "Baseline strategy prompt for weekly revenue review meetings.",
      content: {
        sections: ["pace", "comp-set", "action items"],
      },
    })
    .onConflictDoNothing()
}

if (process.argv[1]?.endsWith("seed.ts")) {
  void seedAppStateFoundation()
    .catch((error) => {
      console.error("Failed to seed app state foundation", error)
      process.exitCode = 1
    })
    .finally(async () => {
      await queryClient.end()
    })
}
