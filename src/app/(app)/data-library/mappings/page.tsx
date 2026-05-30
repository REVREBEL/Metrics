import { IconDatabase as DatabaseZap } from "@tabler/icons-react"

import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { ThemeSwitch } from "@/components/theme-switch"
import {
  getMappingTableRows,
  listMappingTables,
} from "@/lib/mapping-tables/service"

import { MappingTablesManager } from "./mapping-tables-manager"

export default async function MappingTablesPage() {
  const tables = await listMappingTables()
  const initialTableKey = tables[0]?.key
  const initialRows = initialTableKey
    ? await getMappingTableRows(initialTableKey)
    : []

  return (
    <>
      <Header>
        <div className="flex min-w-0 items-center gap-3">
          <DatabaseZap className="size-5 text-primary" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm font-medium leading-none">Data Library</p>
            <p className="text-xs text-muted-foreground">Mapping Tables</p>
          </div>
        </div>
        <div className="ms-auto flex items-center space-x-4">
          <ThemeSwitch />
        </div>
      </Header>

      <Main fluid className="flex min-h-[calc(100svh-4rem)] flex-col gap-5">
        <MappingTablesManager
          tables={tables}
          initialRows={initialRows}
          initialTableKey={initialTableKey}
        />
      </Main>
    </>
  )
}
