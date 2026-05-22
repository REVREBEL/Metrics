import { ThemeSwitch } from "@/components/theme-switch"
import { Header } from "@/components/layout/header"
import { Main } from "@/components/layout/main"

type ProductAreaPageProps = {
  title: string
  description: string
  items?: string[]
}

export function ProductAreaPage({
  title,
  description,
  items = [],
}: ProductAreaPageProps) {
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
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        {items.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item}
                className="rounded-lg border bg-card p-4 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </Main>
    </>
  )
}
