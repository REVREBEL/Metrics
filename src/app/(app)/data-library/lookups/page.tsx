import { IconDatabaseZap } from "@tabler/icons-react"

import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { ThemeSwitch } from "@/components/theme-switch"
import { Toaster } from "@/components/ui/sonner"
import {
  listLookupTables,
  getLookupTableRows,
} from "@/lib/lookup-tables/service"

import { LookupTableManager } from "./lookup-table-manager"

export default async function LookupTableManagerPage() {
  const tables = await listLookupTables()
  const initialTableKey = tables[0]?.key
  const initialRows = initialTableKey
    ? await getLookupTableRows(initialTableKey)
    : []

  return (
    <>
      <Header>
        <div className="flex min-w-0 items-center gap-3">
          <DatabaseZap className="size-5 text-primary" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm font-medium leading-none">Data Library</p>
            <p className="text-xs text-muted-foreground">
              Lookup Table Manager
            </p>
          </div>
        </div>
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
        </div>
      </Header>

      <Main fluid className="flex min-h-[calc(100svh-4rem)] flex-col gap-5">
        <LookupTableManager
          tables={tables}
          initialRows={initialRows}
          initialTableKey={initialTableKey}
        />
      </Main>
      <Toaster position="bottom-right" />
    </>
  )
}
