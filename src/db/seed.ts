import "server-only"

<<<<<<< ours
import {
  campaigns,
  hotelProfiles,
  hotelTaskStatuses,
  strategyTemplates,
} from "@/db/schema"
=======
import { drizzle } from "drizzle-orm/postgres-js"

import { campaigns, hotelProfiles, hotelTaskStatuses, strategyTemplates } from "@/db/schema"
>>>>>>> theirs

import { createPostgresClient } from "./index"

const queryClient = createPostgresClient({ max: 1 })
const db = drizzle(queryClient)

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

<<<<<<< ours
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
=======
  await db.insert(campaigns).values({
    hotelId: hotel.id,
    name: "Demo Campaign",
    status: "draft",
    metadata: { source: "seed" },
  })
>>>>>>> theirs

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
