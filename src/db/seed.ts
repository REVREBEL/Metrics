import "server-only"

import { campaigns, hotelProfiles, hotelTaskStatuses, strategyTemplates } from "@/db/schema"

import { db } from "./index"

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
    .onConflictDoNothing({ target: hotelProfiles.propertyCode })
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

  if (hotel) {
    await db.insert(campaigns).values({
      hotelId: hotel.id,
      name: "Demo Campaign",
      status: "draft",
      metadata: { source: "seed" },
    })
  }

  await db
    .insert(strategyTemplates)
    .values({
      name: "Weekly Revenue Check-In",
      description: "Baseline strategy prompt for weekly revenue review meetings.",
      content: {
        sections: ["pace", "comp-set", "action items"],
      },
    })
    .onConflictDoNothing()
}

void (async () => {
  await seedAppStateFoundation()
  process.exit(0)
})()
