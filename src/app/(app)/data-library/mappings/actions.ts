"use server"

import { and, eq, ne, inArray } from "drizzle-orm"

import { getMappingTableRows } from "@/lib/mapping-tables/service"
import { getColumnsForTable } from "@/lib/mapping-tables/mapping-table-columns"
import {
  resolveLookupOptions,
  validateDropdownValue,
  type LookupOption,
} from "@/lib/mapping-tables/mapping-table-lookups"
import { checkPermission } from "@/lib/permissions/permission-service"
import type {
  MappingDraftSavePayload,
  MappingDraftSaveResult,
  MappingPublishPayload,
  MappingPublishResult,
} from "@/lib/mapping-tables/types"

export async function getMappingTableRowsAction(tableKey: string) {
  return getMappingTableRows(tableKey)
}

export async function resolveLookupOptionsAction(
  lookupSource: string
): Promise<LookupOption[]> {
  return resolveLookupOptions(lookupSource)
}

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


export async function saveMappingDraftAction(
  payload: MappingDraftSavePayload
): Promise<MappingDraftSaveResult> {
  checkPermission("data_library.mapping_tables.edit", {
    userId: payload.updatedBy,
    tableKey: payload.tableKey,
    rowId: payload.rowId,
    action: "save_draft",
  })

  const columns = getColumnsForTable(payload.tableKey)

  const sourceFieldNames = new Set(
    columns
      .filter((col) => col.isSourceSystemField)
      .map((col) => col.field)
  )

  const sanitizedNewValues: Record<string, unknown> = {}
  for (const [key, val] of Object.entries(payload.newValues)) {
    if (!sourceFieldNames.has(key)) {
      sanitizedNewValues[key] = val
    }
  }

  const effectiveValues: Record<string, unknown> = {
    ...payload.previousValues,
    ...sanitizedNewValues,
  }

  const errors: Record<string, string[]> = {}

  for (const col of columns) {
    if (!col.editable || col.isSourceSystemField) continue

    const value = effectiveValues[col.field]

    for (const rule of col.validationRules) {
      if (rule.type === "required") {
        const status = effectiveValues["status"]
        const isActiveStatus =
          !status ||
          (status !== "unmapped" &&
            status !== "inactive" &&
            status !== "deprecated")

        if (isActiveStatus && (!value || String(value).trim() === "")) {
          errors[col.field] = [...(errors[col.field] ?? []), rule.message]
        }
      }
      if (rule.type === "max_length" && typeof rule.value === "number") {
        if (typeof value === "string" && value.length > rule.value) {
          errors[col.field] = [...(errors[col.field] ?? []), rule.message]
        }
      }
    }

    if (
      col.inputType === "dropdown" &&
      col.lookupSource &&
      value &&
      col.lookupSource !== "_mapping_status"
    ) {
      const isValid = await validateDropdownValue(String(value), col.lookupSource)
      if (!isValid) {
        errors[col.field] = [
          ...(errors[col.field] ?? []),
          `"${value}" is not a valid active value for ${col.label}.`,
        ]
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Fix validation errors before saving.",
      errors,
    }
  }

  const modules = await getDbModules()

  if (!modules) {
    return {
      ok: true,
      savedAt: new Date().toISOString(),
      message:
        "Draft noted (database not connected — running in fixture mode).",
    }
  }

  const { db, schema } = modules

  try {
    const savedAt = new Date().toISOString()

    const result = await db.transaction(async (tx) => {
      const existingRows = await tx
        .select({ id: schema.dataLibraryTables.id })
        .from(schema.dataLibraryTables)
        .where(eq(schema.dataLibraryTables.tableName, payload.tableKey))
        .limit(1)

      let dataLibraryTableId: string

      if (existingRows[0]) {
        dataLibraryTableId = existingRows[0].id
      } else {
        const [created] = await tx
          .insert(schema.dataLibraryTables)
          .values({
            tableName: payload.tableKey,
            displayName: payload.tableKey,
            uiMetadata: {},
          })
          .onConflictDoNothing()
          .returning({ id: schema.dataLibraryTables.id })

        if (created) {
          dataLibraryTableId = created.id
        } else {
          const [refetched] = await tx
            .select({ id: schema.dataLibraryTables.id })
            .from(schema.dataLibraryTables)
            .where(eq(schema.dataLibraryTables.tableName, payload.tableKey))
            .limit(1)

          if (!refetched) {
            throw new Error(
              `Could not resolve dataLibraryTable entry for "${payload.tableKey}".`
            )
          }
          dataLibraryTableId = refetched.id
        }
      }

      const publishedDrafts = await tx
        .select({
          id: schema.lookupTableDraftEdits.id,
          rowIdentifier: schema.lookupTableDraftEdits.rowIdentifier,
          draftPayload: schema.lookupTableDraftEdits.draftPayload,
        })
        .from(schema.lookupTableDraftEdits)
        .innerJoin(
          schema.lookupTableChangeRequests,
          eq(
            schema.lookupTableChangeRequests.draftEditId,
            schema.lookupTableDraftEdits.id
          )
        )
        .where(
          and(
            eq(
              schema.lookupTableDraftEdits.dataLibraryTableId,
              dataLibraryTableId
            ),
            eq(schema.lookupTableChangeRequests.status, "published"),
            ne(schema.lookupTableDraftEdits.rowIdentifier, payload.rowId)
          )
        )

      const hasDuplicate = publishedDrafts.some((d) => {
        const dp = d.draftPayload as Record<string, unknown>
        return dp?.sourceCode === payload.sourceCode
      })

      if (hasDuplicate) {
        return {
          ok: false as const,
          errors: {
            sourceCode: [
              "An active published mapping for this source code already exists in this table.",
            ],
          },
        }
      }

      const [draft] = await tx
        .insert(schema.lookupTableDraftEdits)
        .values({
          dataLibraryTableId,
          rowIdentifier: payload.rowId,
          draftPayload: {
            tableKey: payload.tableKey,
            rowId: payload.rowId,
            sourceCode: payload.sourceCode,
            sourceSystem: payload.sourceSystem,
            previousValues: payload.previousValues,
            newValues: sanitizedNewValues,
            changeReason: payload.changeReason,
            updatedBy: payload.updatedBy,
            savedAt,
          } as Record<string, unknown>,
        })
        .returning({ id: schema.lookupTableDraftEdits.id })

      await tx.insert(schema.lookupTableChangeRequests).values({
        draftEditId: draft.id,
        rationale: payload.changeReason || "Mapping table draft save",
        status: "pending",
      })

      const previousStatus = payload.previousValues["status"]
      const isResolvingUnmapped =
        previousStatus === "unmapped" || !payload.previousValues["standardCode"]

      if (isResolvingUnmapped) {
        const pendingUnmappedDrafts = await tx
          .select({
            changeRequestId: schema.lookupTableChangeRequests.id,
          })
          .from(schema.lookupTableDraftEdits)
          .innerJoin(
            schema.lookupTableChangeRequests,
            eq(
              schema.lookupTableChangeRequests.draftEditId,
              schema.lookupTableDraftEdits.id
            )
          )
          .where(
            and(
              eq(
                schema.lookupTableDraftEdits.dataLibraryTableId,
                dataLibraryTableId
              ),
              eq(schema.lookupTableDraftEdits.rowIdentifier, payload.rowId),
              eq(schema.lookupTableChangeRequests.status, "pending"),
              ne(schema.lookupTableDraftEdits.id, draft.id)
            )
          )

        if (pendingUnmappedDrafts.length > 0) {
          const pendingRequestIds = pendingUnmappedDrafts.map((d) => d.changeRequestId)
          await tx
            .update(schema.lookupTableChangeRequests)
            .set({ status: "pending_review", updatedAt: new Date() })
            .where(
              inArray(
                schema.lookupTableChangeRequests.id,
                pendingRequestIds
              )
            )
        }

        if (pendingUnmappedDrafts.length > 0) {
          await tx.insert(schema.appAuditLog).values({
            entityType: "unmapped_code_draft",
            entityId: `${payload.tableKey}::${payload.sourceCode}`,
            action: "unmapped_code_pending_review",
            metadata: {
              mapping_table: payload.tableKey,
              source_code: payload.sourceCode,
              source_system: payload.sourceSystem,
              row_id: payload.rowId,
              drafted_by: payload.updatedBy,
              drafted_at: savedAt,
              resolution: "draft_mapping_submitted",
              pending_drafts_marked_review: pendingUnmappedDrafts.length,
            },
          })
        }
      }

      const changedFields = Object.keys(sanitizedNewValues).filter(
        (key) =>
          String(sanitizedNewValues[key]) !==
          String(payload.previousValues[key] ?? "")
      )

      for (const fieldName of changedFields) {
        await tx.insert(schema.appAuditLog).values({
          entityType: "mapping_table_draft",
          entityId: draft.id,
          action: "mapping_draft_field_changed",
          beforeState: {
            [fieldName]: payload.previousValues[fieldName],
          } as Record<string, unknown>,
          afterState: {
            [fieldName]: sanitizedNewValues[fieldName],
          } as Record<string, unknown>,
          metadata: {
            mapping_table: payload.tableKey,
            mapping_key: payload.rowId,
            source_system: payload.sourceSystem,
            source_code: payload.sourceCode,
            field_name: fieldName,
            previous_value: payload.previousValues[fieldName],
            new_value: sanitizedNewValues[fieldName],
            change_reason: payload.changeReason,
            updated_by: payload.updatedBy,
            updated_at: savedAt,
          },
        })
      }

      await tx.insert(schema.appAuditLog).values({
        entityType: "mapping_table_draft",
        entityId: draft.id,
        action: "mapping_draft_saved",
        beforeState: payload.previousValues as Record<string, unknown>,
        afterState: sanitizedNewValues as Record<string, unknown>,
        metadata: {
          mapping_table: payload.tableKey,
          mapping_key: payload.rowId,
          source_system: payload.sourceSystem,
          source_code: payload.sourceCode,
          fields_changed: changedFields,
          change_reason: payload.changeReason,
          updated_by: payload.updatedBy,
          updated_at: savedAt,
        },
      })

      return { ok: true as const, id: draft.id }
    })

    if (!result.ok) {
      return {
        ok: false,
        message: "Fix validation errors before saving.",
        errors: (result as { ok: false; errors: Record<string, string[]> }).errors,
      }
    }

    return {
      ok: true,
      draftId: (result as { ok: true; id: string }).id,
      savedAt,
      message: "Draft saved successfully.",
    }
  } catch (err) {
    console.error("[mapping-actions] saveMappingDraft failed:", err)
    return {
      ok: false,
      message:
        err instanceof Error
          ? err.message
          : "Unable to persist mapping draft. Please try again.",
    }
  }
}

export async function publishMappingChangeAction(
  payload: MappingPublishPayload
): Promise<MappingPublishResult> {
  checkPermission("data_library.mapping_tables.publish", {
    userId: payload.publishedBy,
    tableKey: payload.tableKey,
    rowId: payload.rowId,
    action: "publish",
  })

  const modules = await getDbModules()

  if (!modules) {
    return {
      ok: true,
      publishedAt: new Date().toISOString(),
      message:
        "Publish recorded (database not connected — running in fixture mode).",
    }
  }

  const { db, schema } = modules

  try {
    const publishedAt = new Date().toISOString()

    await db.transaction(async (tx) => {
      const [draft] = await tx
        .select({
          id: schema.lookupTableDraftEdits.id,
          dataLibraryTableId: schema.lookupTableDraftEdits.dataLibraryTableId,
          draftPayload: schema.lookupTableDraftEdits.draftPayload,
        })
        .from(schema.lookupTableDraftEdits)
        .where(eq(schema.lookupTableDraftEdits.id, payload.draftId))
        .limit(1)

      if (!draft) {
        throw new Error("Draft edit not found.")
      }

      const draftData = draft.draftPayload as Record<string, unknown>
      const previousValues =
        (draftData.previousValues as Record<string, unknown>) ?? {}
      const newValues =
        (draftData.newValues as Record<string, unknown>) ?? {}

      await tx
        .update(schema.lookupTableChangeRequests)
        .set({ status: "published", updatedAt: new Date() })
        .where(eq(schema.lookupTableChangeRequests.draftEditId, draft.id))

      const [activeDraft] = await tx
        .insert(schema.lookupTableDraftEdits)
        .values({
          dataLibraryTableId: draft.dataLibraryTableId,
          rowIdentifier: payload.rowId,
          draftPayload: {
            ...draftData,
            isActivePublished: true,
            publishedAt,
            publishedBy: payload.publishedBy,
            publishChangeReason: payload.changeReason ?? "",
          } as Record<string, unknown>,
        })
        .returning({ id: schema.lookupTableDraftEdits.id })

      await tx.insert(schema.lookupTableChangeRequests).values({
        draftEditId: activeDraft.id,
        rationale: payload.changeReason ?? "Mapping publish — active layer commit",
        status: "published",
      })

      const changedFields = Object.keys(newValues).filter(
        (key) =>
          String(newValues[key]) !== String(previousValues[key] ?? "")
      )

      for (const fieldName of changedFields) {
        await tx.insert(schema.appAuditLog).values({
          entityType: "mapping_table_publish",
          entityId: payload.draftId,
          action: "mapping_change_published_field",
          beforeState: {
            [fieldName]: previousValues[fieldName],
          } as Record<string, unknown>,
          afterState: {
            [fieldName]: newValues[fieldName],
          } as Record<string, unknown>,
          metadata: {
            mapping_table: payload.tableKey,
            mapping_key: payload.rowId,
            source_system: payload.sourceSystem,
            source_code: payload.sourceCode,
            field_name: fieldName,
            previous_value: previousValues[fieldName],
            new_value: newValues[fieldName],
            change_reason: payload.changeReason ?? "",
            published_by: payload.publishedBy,
            published_at: publishedAt,
          },
        })
      }

      await tx.insert(schema.appAuditLog).values({
        entityType: "mapping_table_publish",
        entityId: payload.draftId,
        action: "mapping_change_published",
        beforeState: previousValues,
        afterState: newValues,
        metadata: {
          mapping_table: payload.tableKey,
          mapping_key: payload.rowId,
          source_system: payload.sourceSystem,
          source_code: payload.sourceCode,
          fields_changed: changedFields,
          change_reason: payload.changeReason ?? "",
          published_by: payload.publishedBy,
          published_at: publishedAt,
        },
      })

      const wasUnmapped =
        previousValues["status"] === "unmapped" ||
        previousValues["status"] === "draft" ||
        !previousValues["standardCode"]

      if (wasUnmapped) {
        const pendingDrafts = await tx
          .select({
            changeRequestId: schema.lookupTableChangeRequests.id,
          })
          .from(schema.lookupTableDraftEdits)
          .innerJoin(
            schema.lookupTableChangeRequests,
            eq(
              schema.lookupTableChangeRequests.draftEditId,
              schema.lookupTableDraftEdits.id
            )
          )
          .where(
            and(
              eq(
                schema.lookupTableDraftEdits.dataLibraryTableId,
                draft.dataLibraryTableId
              ),
              eq(schema.lookupTableDraftEdits.rowIdentifier, payload.rowId),
              eq(schema.lookupTableChangeRequests.status, "pending")
            )
          )

        if (pendingDrafts.length > 0) {
          const pendingRequestIds = pendingDrafts.map((d) => d.changeRequestId)
          await tx
            .update(schema.lookupTableChangeRequests)
            .set({ status: "resolved", updatedAt: new Date() })
            .where(
              inArray(
                schema.lookupTableChangeRequests.id,
                pendingRequestIds
              )
            )
        }

        await tx.insert(schema.appAuditLog).values({
          entityType: "unmapped_code_resolved",
          entityId: `${payload.tableKey}::${payload.sourceCode}`,
          action: "unmapped_code_resolved",
          metadata: {
            mapping_table: payload.tableKey,
            source_code: payload.sourceCode,
            source_system: payload.sourceSystem,
            row_id: payload.rowId,
            resolved_by: payload.publishedBy,
            resolved_at: publishedAt,
            resolution: "mapped_via_publish",
            previously_pending_drafts_resolved: pendingDrafts.length,
          },
        })
      }
    })

    return {
      ok: true,
      publishedAt,
      message: "Mapping change published successfully.",
    }
  } catch (err) {
    console.error("[mapping-actions] publishMappingChange failed:", err)
    return {
      ok: false,
      message:
        err instanceof Error
          ? err.message
          : "Unable to publish mapping change. Please try again.",
    }
  }
}
