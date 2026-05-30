import { IconArrowDownAZ, IconArrowUpAZ } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

import { TableHead } from "./table"

type SortDirection = "asc" | "desc"

type SortableTableHeadProps = {
  active?: boolean
  children: React.ReactNode
  className?: string
  direction?: SortDirection
  onClick: () => void
}

export function SortableTableHead({
  active = false,
  children,
  className,
  direction = "asc",
  onClick,
}: SortableTableHeadProps) {
  return (
    <TableHead className={className}>
      <button
        type="button"
        onClick={onClick}
        className={cn("inline-flex items-center gap-1", active && "text-primary")}
      >
        {children}
        {direction === "asc" ? (
          <ArrowDownAZ className="size-3" aria-hidden="true" />
        ) : (
          <ArrowUpAZ className="size-3" aria-hidden="true" />
        )}
      </button>
    </TableHead>
  )
}
