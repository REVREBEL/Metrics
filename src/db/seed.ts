import nextEnv from "@next/env"

nextEnv.loadEnvConfig(process.cwd())

const { sql } = await import("drizzle-orm")
const { drizzle } = await import("drizzle-orm/postgres-js")

const schema = await import("@/db/schema")
const {
  campaigns,
  dataLibraryTables,
  hotelProfiles,
  hotelTaskStatuses,
  strategyTemplates,
} = schema

const { createPostgresClient } = await import("./postgres")

const queryClient = createPostgresClient({ max: 1 })
const db = drizzle(queryClient, { schema })


const dataLibrarySeedTables = [
  {
    tableName: "metrics_core.dim_property",
    displayName: "Property Directory",
    description: "Property dimension used for hotel profile alignment.",
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
  const [insertedHotel] = await db
    .insert(hotelProfiles)
    .values({
      propertyCode: "DEMO_001",
      name: "Demo Hotel",
      market: "Austin",
      timezone: "America/Chicago",
      profileData: { tier: "pilot" },
    })
    .onConflictDoUpdate({
      target: hotelProfiles.propertyCode,
      set: {
        name: "Demo Hotel",
        market: "Austin",
        timezone: "America/Chicago",
        profileData: { tier: "pilot" },
      },
    })
    .returning({ id: hotelProfiles.id })

  await db
    .insert(hotelTaskStatuses)
    .values([
      { code: "todo", label: "To Do", sortOrder: 10 },
      { code: "in_progress", label: "In Progress", sortOrder: 20 },
      { code: "blocked", label: "Blocked", sortOrder: 30 },
      { code: "done", label: "Done", sortOrder: 40 },
    ])
    .onConflictDoNothing({ target: hotelTaskStatuses.code })

  const hotel =
    insertedHotel ??
    (await db.query.hotelProfiles.findFirst({
      where: (table, { eq }) => eq(table.propertyCode, "DEMO_001"),
      columns: { id: true },
    }))

  if (hotel) {
    await db
      .insert(campaigns)
      .values({
        hotelId: hotel.id,
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
