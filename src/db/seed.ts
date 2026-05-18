import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import {
  campaigns,
  dataLibraryTables,
  hotelProfiles,
  hotelTaskStatuses,
  strategyTemplates,
} from "./schema"
import * as schema from "./schema"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required to seed the Postgres app-state database"
  )
}

const maxConnections = Number(process.env.POSTGRES_POOL_MAX ?? 1)
const queryClient = postgres(databaseUrl, {
  max: Number.isFinite(maxConnections) ? maxConnections : 1,
  prepare: false,
})

const db = drizzle(queryClient, { schema })

export async function seedAppStateFoundation() {
  const [hotel] = await db
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

  await db
    .insert(strategyTemplates)
    .values({
      slug: "weekly-revenue-check-in",
      name: "Weekly Revenue Check-In",
      description:
        "Baseline strategy prompt for weekly revenue review meetings.",
      content: {
        sections: ["pace", "comp-set", "action items"],
      },
    })
    .onConflictDoNothing({ target: strategyTemplates.slug })

  await db
    .insert(dataLibraryTables)
    .values({
      warehouseSchema: "metrics_core",
      tableName: "dim_property",
      displayName: "Properties",
      description: "Analytical property dimension owned by BigQuery/Dataform.",
      uiMetadata: { editable: false },
    })
    .onConflictDoNothing({
      target: [dataLibraryTables.warehouseSchema, dataLibraryTables.tableName],
    })

  if (!hotel) {
    return
  }

  const [existingCampaign] = await db
    .select({ id: campaigns.id })
    .from(campaigns)
    .where(eq(campaigns.name, "Demo Campaign"))
    .limit(1)

  if (!existingCampaign) {
    await db.insert(campaigns).values({
      hotelId: hotel.id,
      name: "Demo Campaign",
      status: "draft",
      metadata: { source: "seed" },
    })
  }
}

void (async () => {
  try {
    await seedAppStateFoundation()
  } finally {
    await queryClient.end()
  }
})()
