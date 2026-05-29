"use server"

import { auth } from "@clerk/nextjs/server"
import { eq, and } from "drizzle-orm"

// ── DB module loader ──────────────────────────────────────────────────────────

async function getDbModules() {
  try {
    const [{ db }, schema] = await Promise.all([
      import("@/db/index"),
      import("@/db/schema"),
    ])
    return { db, schema }
  } catch {
    return null
  }
}

// ── Server-side hotel authorization ──────────────────────────────────────────

type DbModules = NonNullable<Awaited<ReturnType<typeof getDbModules>>>

/**
 * Resolves the Clerk `userId` from the current server request (via `auth()`)
 * and verifies the caller is a member of the given `hotelId` by checking
 * `appUsers` (clerkUserId → id) → `hotelUserAccess` (userId + hotelId).
 *
 * Returns `{ appUserId }` on success, or throws with a descriptive message.
 * Only call this after confirming `modules !== null` (DB connected).
 */
async function assertHotelAccess(
  modules: DbModules,
  hotelId: string
): Promise<{ appUserId: string }> {
  const session = await auth()
  const clerkUserId = session?.userId

  if (!clerkUserId) {
    throw new Error("Unauthenticated: no active session.")
  }

  const { db, schema } = modules

  // Resolve internal appUser record from Clerk user ID
  const [appUser] = await db
    .select({ id: schema.appUsers.id })
    .from(schema.appUsers)
    .where(eq(schema.appUsers.clerkUserId, clerkUserId))
    .limit(1)

  if (!appUser) {
    throw new Error("Forbidden: user account not found.")
  }

  // Verify this user has access to the requested hotel
  const [access] = await db
    .select({ hotelId: schema.hotelUserAccess.hotelId })
    .from(schema.hotelUserAccess)
    .where(
      and(
        eq(schema.hotelUserAccess.userId, appUser.id),
        eq(schema.hotelUserAccess.hotelId, hotelId)
      )
    )
    .limit(1)

  if (!access) {
    throw new Error("Forbidden: you do not have access to this property.")
  }

  return { appUserId: appUser.id }
}

// ── External Assignees ────────────────────────────────────────────────────────

export type ExternalAssigneeRow = {
  id: string
  hotelId: string
  name: string
  entityType: string | null
  contactEmail: string | null
  createdAt: string
}

export type ExternalAssigneeActionResult = {
  ok: boolean
  message: string
  data?: ExternalAssigneeRow
}

/**
 * Get the active hotel for the current Clerk user.
 * Returns the first hotel they have access to, or null if DB is unavailable
 * (fixture mode) or the user has no hotel memberships.
 */
export async function getDefaultHotelAction(): Promise<{ id: string; name: string } | null> {
  const modules = await getDbModules()
  if (!modules) return null

  const { db, schema } = modules

  const session = await auth()
  const clerkUserId = session?.userId

  if (!clerkUserId) return null

  try {
    // Resolve internal user
    const [appUser] = await db
      .select({ id: schema.appUsers.id })
      .from(schema.appUsers)
      .where(eq(schema.appUsers.clerkUserId, clerkUserId))
      .limit(1)

    if (!appUser) return null

    // Return the first hotel this user has access to
    const [row] = await db
      .select({ id: schema.hotelProfiles.id, name: schema.hotelProfiles.name })
      .from(schema.hotelUserAccess)
      .innerJoin(
        schema.hotelProfiles,
        eq(schema.hotelUserAccess.hotelId, schema.hotelProfiles.id)
      )
      .where(eq(schema.hotelUserAccess.userId, appUser.id))
      .limit(1)

    return row ?? null
  } catch {
    return null
  }
}

/**
 * List all external assignees for a given hotel.
 * Verifies the caller has access to that hotel server-side.
 */
export async function listExternalAssigneesAction(
  hotelId: string
): Promise<ExternalAssigneeRow[]> {
  const modules = await getDbModules()
  if (!modules) return []

  const { db, schema } = modules
  try {
    await assertHotelAccess(modules, hotelId)

    const rows = await db
      .select()
      .from(schema.growthPlanExternalAssignees)
      .where(eq(schema.growthPlanExternalAssignees.hotelId, hotelId))
      .orderBy(schema.growthPlanExternalAssignees.createdAt)

    return rows.map((r) => ({
      id: r.id,
      hotelId: r.hotelId,
      name: r.name,
      entityType: r.entityType ?? null,
      contactEmail: r.contactEmail ?? null,
      createdAt: r.createdAt.toISOString(),
    }))
  } catch (err) {
    console.error("[tasks/actions] listExternalAssignees failed:", err)
    return []
  }
}

/**
 * Create a new external assignee for a hotel.
 * Verifies the caller has access to that hotel server-side.
 */
export async function createExternalAssigneeAction(payload: {
  hotelId: string
  name: string
  entityType?: string
  contactEmail?: string
}): Promise<ExternalAssigneeActionResult> {
  if (!payload.name?.trim()) {
    return { ok: false, message: "Name is required." }
  }

  const modules = await getDbModules()
  if (!modules) {
    return {
      ok: true,
      message: "Saved (database not connected — running in fixture mode).",
    }
  }

  const { db, schema } = modules
  try {
    await assertHotelAccess(modules, payload.hotelId)

    const normalizedEntityType = (payload.entityType?.trim() || null) as
      | typeof schema.growthPlanExternalAssignees.$inferInsert["entityType"]
      | null

    const [created] = await db
      .insert(schema.growthPlanExternalAssignees)
      .values({
        hotelId: payload.hotelId,
        name: payload.name.trim(),
        entityType: normalizedEntityType,
        contactEmail: payload.contactEmail?.trim() || null,
      })
      .returning()

    return {
      ok: true,
      message: "Vendor / agency added.",
      data: {
        id: created.id,
        hotelId: created.hotelId,
        name: created.name,
        entityType: created.entityType ?? null,
        contactEmail: created.contactEmail ?? null,
        createdAt: created.createdAt.toISOString(),
      },
    }
  } catch (err) {
    console.error("[tasks/actions] createExternalAssignee failed:", err)
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Failed to save. Please try again.",
    }
  }
}

/**
 * Update an existing external assignee.
 * Verifies the caller has access to the hotel server-side, and enforces hotel
 * scoping in the WHERE clause (id AND hotelId).
 */
export async function updateExternalAssigneeAction(payload: {
  id: string
  hotelId: string
  name: string
  entityType?: string
  contactEmail?: string
}): Promise<ExternalAssigneeActionResult> {
  if (!payload.name?.trim()) {
    return { ok: false, message: "Name is required." }
  }

  const modules = await getDbModules()
  if (!modules) {
    return {
      ok: true,
      message: "Updated (database not connected — running in fixture mode).",
    }
  }

  const { db, schema } = modules
  try {
    await assertHotelAccess(modules, payload.hotelId)

    const normalizedEntityType = (payload.entityType?.trim() || null) as
      | typeof schema.growthPlanExternalAssignees.$inferInsert["entityType"]
      | null

    const [updated] = await db
      .update(schema.growthPlanExternalAssignees)
      .set({
        name: payload.name.trim(),
        entityType: normalizedEntityType,
        contactEmail: payload.contactEmail?.trim() || null,
      })
      .where(
        and(
          eq(schema.growthPlanExternalAssignees.id, payload.id),
          eq(schema.growthPlanExternalAssignees.hotelId, payload.hotelId)
        )
      )
      .returning()

    if (!updated) {
      return { ok: false, message: "Record not found or access denied." }
    }

    return {
      ok: true,
      message: "Vendor / agency updated.",
      data: {
        id: updated.id,
        hotelId: updated.hotelId,
        name: updated.name,
        entityType: updated.entityType ?? null,
        contactEmail: updated.contactEmail ?? null,
        createdAt: updated.createdAt.toISOString(),
      },
    }
  } catch (err) {
    console.error("[tasks/actions] updateExternalAssignee failed:", err)
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Failed to update. Please try again.",
    }
  }
}

/**
 * Delete an external assignee.
 * Verifies the caller has access to the hotel server-side, and enforces hotel
 * scoping in the WHERE clause (id AND hotelId).
 */
export async function deleteExternalAssigneeAction(
  id: string,
  hotelId: string
): Promise<{ ok: boolean; message: string }> {
  const modules = await getDbModules()
  if (!modules) {
    return {
      ok: true,
      message: "Deleted (database not connected — running in fixture mode).",
    }
  }

  const { db, schema } = modules
  try {
    await assertHotelAccess(modules, hotelId)

    await db
      .delete(schema.growthPlanExternalAssignees)
      .where(
        and(
          eq(schema.growthPlanExternalAssignees.id, id),
          eq(schema.growthPlanExternalAssignees.hotelId, hotelId)
        )
      )
    return { ok: true, message: "Vendor / agency removed." }
  } catch (err) {
    console.error("[tasks/actions] deleteExternalAssignee failed:", err)
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Failed to delete. Please try again.",
    }
  }
}
