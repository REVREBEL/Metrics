"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconChevronRight } from "@tabler/icons-react"

import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"
import { ThemeSwitch } from "@/components/theme-switch"

type ProductAreaPageProps = {
  title: string
  description: string
  items?: string[]
}

const routeOverrides: Record<string, string> = {
  "Lookup Tables": "lookups",
  "Mapping Tables": "mappings",
}

function toSlug(item: string): string {
  if (routeOverrides[item]) {
    return routeOverrides[item]
  }

  return item
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

export function ProductAreaPage({ title, description, items = [] }: ProductAreaPageProps) {
  const pathname = usePathname()

  return (
    <>
      <Header>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-none">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="ms-auto flex items-center">
          <ThemeSwitch />
        </div>
      </Header>

      <Main className="max-w-5xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{description}</p>
        </div>

        {items.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const slug = toSlug(item)
              const href = `${pathname.replace(/\/$/, "")}/${slug}`

              return (
                <Link
                  key={item}
                  href={href}
                  className="group flex items-center justify-between rounded-lg border bg-card p-4 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-muted"
                >
                  <span>{item}</span>
                  <IconChevronRight
                    className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                    strokeWidth={1.5}
                  />
                </Link>
              )
            })}
          </div>
        ) : null}
      </Main>
    </>
  )
}