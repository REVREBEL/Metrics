import React, { Suspense } from 'react'

const YearMonthSelectorLazy = React.lazy(() =>
  import('./index').then((mod) => ({ default: mod.YearMonthSelector }))
)

export function YearMonthSelector(props: Record<string, unknown>) {
  return (
    <Suspense fallback={null}>
      <YearMonthSelectorLazy {...(props as any)} />
    </Suspense>
  )
}
