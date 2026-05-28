"use client"

import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import { AlertTriangle, CheckCircle2, Loader2, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import type { MappingColumnDefinition } from "@/lib/mapping-tables/mapping-table-columns"
import type { MappingTableRow } from "@/lib/mapping-tables/types"
import { cn } from "@/lib/utils"

import {
  publishMappingChangeAction,
  saveMappingDraftAction,
} from "./actions"

type LookupOption = {
  value: string
  label: string
  group?: string
  isDeprecated: boolean
}

type MappingRowEditDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  row: MappingTableRow | null
  tableKey: string
  columns: MappingColumnDefinition[]
  lookupOptions: Record<string, LookupOption[]>
  onSaved?: (rowId: string, savedAt: string, draftId?: string) => void
}

type FieldValues = Record<string, string>

function getInitialValues(
  row: MappingTableRow | null,
  columns: MappingColumnDefinition[]
): FieldValues {
  if (!row) return {}
  const values: FieldValues = {}
  for (const col of columns) {
    if (!col.visibleInDetail) continue
    const raw = (row as unknown as Record<string, unknown>)[col.field]
    values[col.field] = raw != null ? String(raw) : ""
  }
  return values
}

export function MappingRowEditDrawer({
  open,
  onOpenChange,
  row,
  tableKey,
  columns,
  lookupOptions,
  onSaved,
}: MappingRowEditDrawerProps) {
  const initialValues = useMemo(
    () => getInitialValues(row, columns),
    [row, columns]
  )

  const [values, setValues] = useState<FieldValues>(initialValues)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [saveResult, setSaveResult] = useState<{
    ok: boolean
    message: string
    draftId?: string
    savedAt?: string
  } | null>(null)
  const [lastSavedDraftId, setLastSavedDraftId] = useState<string | undefined>()
  const [isSaving, startSavingTransition] = useTransition()
  const [isPublishing, startPublishingTransition] = useTransition()

  const isDirty = useMemo(() => {
    return Object.keys(values).some(
      (key) => values[key] !== (initialValues[key] ?? "")
    )
  }, [values, initialValues])

  const hasUnsavedRef = useRef(isDirty)
  hasUnsavedRef.current = isDirty

  useEffect(() => {
    if (open && row) {
      setValues(getInitialValues(row, columns))
      setFieldErrors({})
      setSaveResult(null)
      setLastSavedDraftId(undefined)
    }
  }, [open, row, columns])

  function handleOpenChange(next: boolean) {
    if (!next && hasUnsavedRef.current) {
      if (!window.confirm("You have unsaved changes. Close without saving?")) {
        return
      }
    }
    onOpenChange(next)
  }

  function setField(field: string, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
    setSaveResult(null)
  }

  function handleSaveDraft() {
    if (!row) return

    startSavingTransition(async () => {
      const previousValues: Record<string, unknown> = {}
      const newValues: Record<string, unknown> = {}

      for (const [key, val] of Object.entries(values)) {
        const initial = initialValues[key] ?? ""
        previousValues[key] = initial
        if (val !== initial) {
          newValues[key] = val
        }
      }

      const result = await saveMappingDraftAction({
        tableKey,
        rowId: row.id,
        sourceCode: row.sourceCode,
        sourceSystem: row.sourceSystem,
        previousValues,
        newValues,
        changeReason: (values["reviewReason"] ?? "Manual draft edit via UI"),
        updatedBy: "current_user",
      })

      if (!result.ok && result.errors) {
        setFieldErrors(result.errors)
      }

      setSaveResult({
        ok: result.ok,
        message: result.message ?? "",
        draftId: result.draftId,
        savedAt: result.savedAt,
      })

      if (result.ok) {
        setLastSavedDraftId(result.draftId)
        onSaved?.(row.id, result.savedAt ?? new Date().toISOString(), result.draftId)
      }
    })
  }

  function handlePublish() {
    if (!row || !lastSavedDraftId) return

    startPublishingTransition(async () => {
      const result = await publishMappingChangeAction({
        draftId: lastSavedDraftId,
        tableKey,
        rowId: row.id,
        sourceCode: row.sourceCode,
        sourceSystem: row.sourceSystem,
        publishedBy: "current_user",
        changeReason: values["reviewReason"] ?? "",
      })

      setSaveResult({
        ok: result.ok,
        message: result.message ?? "",
        savedAt: result.publishedAt,
      })

      if (result.ok) {
        onSaved?.(row.id, result.publishedAt ?? new Date().toISOString())
      }
    })
  }

  const editableColumns = columns.filter(
    (col) => col.visibleInDetail && col.inputType !== "system"
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        className="flex h-[75vh] w-[75vw] max-h-[75vh] max-w-[75vw] flex-col gap-0 p-0"
        showCloseButton={false}
      >
        <DialogHeader className="shrink-0 border-b px-6 py-4">
          <DialogTitle className="flex items-center gap-2">
            Edit Mapping Row
            {isDirty && (
              <Badge variant="outline" className="text-amber-600 border-amber-300">
                Unsaved changes
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {row ? (
              <span>
                <span className="font-mono">{row.sourceCode}</span>
                {" · "}
                {row.sourceSystem}
              </span>
            ) : (
              "No row selected."
            )}
          </DialogDescription>
        </DialogHeader>

        {row && (
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-5">
              {editableColumns.map((col) => (
                <FieldRenderer
                  key={col.field}
                  col={col}
                  value={values[col.field] ?? ""}
                  onChange={(val) => setField(col.field, val)}
                  errors={fieldErrors[col.field] ?? []}
                  options={
                    col.lookupSource ? (lookupOptions[col.lookupSource] ?? []) : []
                  }
                />
              ))}

              {saveResult && (
                <div
                  className={cn(
                    "flex items-start gap-2 rounded-md border p-3 text-sm",
                    saveResult.ok
                      ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300"
                      : "border-destructive/30 bg-destructive/5 text-destructive"
                  )}
                >
                  {saveResult.ok ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  ) : (
                    <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                  )}
                  <p>{saveResult.message}</p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}

        <DialogFooter className="shrink-0 border-t px-6 py-4">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            <X className="size-4" />
            Close
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={!row || isSaving || isPublishing || !isDirty}
          >
            {isSaving && <Loader2 className="size-4 animate-spin" />}
            Save Draft
          </Button>
          <Button
            onClick={handlePublish}
            disabled={!row || isPublishing || isSaving || !lastSavedDraftId}
          >
            {isPublishing && <Loader2 className="size-4 animate-spin" />}
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function FieldRenderer({
  col,
  value,
  onChange,
  errors,
  options,
}: {
  col: MappingColumnDefinition
  value: string
  onChange: (val: string) => void
  errors: string[]
  options: LookupOption[]
}) {
  const hasError = errors.length > 0
  const isReadOnly = col.inputType === "readonly" || !col.editable

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Label
          htmlFor={`field-${col.field}`}
          className={cn(
            "text-sm font-medium",
            isReadOnly && "text-muted-foreground"
          )}
        >
          {col.label}
          {col.required && !isReadOnly && (
            <span className="ml-1 text-destructive">*</span>
          )}
        </Label>
        {isReadOnly && (
          <Badge variant="outline" className="text-[10px] px-1 py-0">
            Read-only
          </Badge>
        )}
        {col.isSourceSystemField && !isReadOnly && (
          <Badge variant="outline" className="text-[10px] px-1 py-0">
            Source system
          </Badge>
        )}
      </div>

      {col.description && (
        <p className="text-xs text-muted-foreground">{col.description}</p>
      )}

      {isReadOnly ? (
        <div
          id={`field-${col.field}`}
          className="min-h-9 rounded-md border bg-muted/50 px-3 py-2 text-sm text-muted-foreground"
        >
          {value || <span className="italic opacity-60">—</span>}
        </div>
      ) : col.inputType === "dropdown" ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            id={`field-${col.field}`}
            className={cn(hasError && "border-destructive")}
          >
            <SelectValue placeholder={`Select ${col.label.toLowerCase()}…`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                disabled={opt.isDeprecated}
              >
                <span className={opt.isDeprecated ? "line-through opacity-50" : ""}>
                  {opt.label}
                </span>
                {opt.isDeprecated && (
                  <span className="ml-1 text-xs text-muted-foreground">(deprecated)</span>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : col.inputType === "textarea" ? (
        <Textarea
          id={`field-${col.field}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(hasError && "border-destructive")}
          rows={3}
        />
      ) : col.inputType === "boolean" ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            id={`field-${col.field}`}
            className={cn(hasError && "border-destructive")}
          >
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={`field-${col.field}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(hasError && "border-destructive")}
          type={col.inputType === "number" ? "number" : "text"}
        />
      )}

      {hasError &&
        errors.map((err, i) => (
          <p key={i} className="text-xs text-destructive">
            {err}
          </p>
        ))}
    </div>
  )
}
