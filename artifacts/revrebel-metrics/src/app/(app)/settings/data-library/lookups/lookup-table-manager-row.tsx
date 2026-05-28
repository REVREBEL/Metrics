import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { TableCell, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { LookupTableRow } from "@/lib/lookup-tables/types"

import { formatDate } from "./lookup-table-manager-utils"

type LookupTableManagerRowProps = {
  row: LookupTableRow
  dirty: boolean
  rowErrors?: Record<string, string>
  updateRow: (id: string, patch: Partial<LookupTableRow>) => void
}

export function LookupTableManagerRow({
  row,
  dirty,
  rowErrors,
  updateRow,
}: LookupTableManagerRowProps) {
  return (
    <TableRow
      className={cn(
        dirty && "bg-amber-50/70 hover:bg-amber-50 dark:bg-amber-950/20",
        rowErrors && "bg-destructive/5 hover:bg-destructive/10"
      )}
    >
      <TableCell>
        <div className="font-mono text-xs">{row.rawCode}</div>
        <div className="mt-1 font-mono text-[11px] text-muted-foreground">{row.id}</div>
      </TableCell>
      <TableCell className="max-w-52 whitespace-normal">{row.rawName}</TableCell>
      <TableCell>{row.sourceSystem}</TableCell>
      <TableCell className="min-w-48">
        <Input
          value={row.mappedValue}
          aria-invalid={Boolean(rowErrors?.mappedValue)}
          onChange={(event) =>
            updateRow(row.id, {
              mappedValue: event.target.value,
            })
          }
        />
        {rowErrors?.mappedValue ? (
          <p className="mt-1 text-xs text-destructive">{rowErrors.mappedValue}</p>
        ) : null}
      </TableCell>
      <TableCell className="min-w-44">
        <Input
          value={row.mappedGroup ?? ""}
          onChange={(event) =>
            updateRow(row.id, {
              mappedGroup: event.target.value,
            })
          }
        />
      </TableCell>
      <TableCell>
        <Switch
          checked={row.isActive}
          onCheckedChange={(checked) => updateRow(row.id, { isActive: checked })}
          aria-label={`Set ${row.rawCode} active state`}
        />
      </TableCell>
      <TableCell className="min-w-64">
        <Textarea
          value={row.notes ?? ""}
          aria-invalid={Boolean(rowErrors?.notes)}
          onChange={(event) =>
            updateRow(row.id, {
              notes: event.target.value,
            })
          }
          className="min-h-16 resize-none"
        />
        <div className="mt-1 flex justify-between gap-2 text-xs text-muted-foreground">
          {rowErrors?.notes ? (
            <span className="text-destructive">{rowErrors.notes}</span>
          ) : (
            <span>Optional</span>
          )}
          <span>{(row.notes ?? "").length}/500</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-xs">{formatDate(row.updatedAt)}</div>
        <div className="mt-1 text-xs text-muted-foreground">{row.updatedBy}</div>
      </TableCell>
      <TableCell>
        {rowErrors ? (
          <Badge variant="destructive">Invalid</Badge>
        ) : dirty ? (
          <Badge>Unsaved</Badge>
        ) : row.isActive ? (
          <Badge variant="secondary">Active</Badge>
        ) : (
          <Badge variant="outline">Inactive</Badge>
        )}
      </TableCell>
    </TableRow>
  )
}
