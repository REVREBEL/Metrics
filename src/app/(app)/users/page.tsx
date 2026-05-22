"use client"

import { Suspense, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'
import type { NavigateFn } from '@/hooks/use-table-url-state'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersProvider } from './components/users-provider'
import { UsersTable } from './components/users-table'
import { users } from './data/users'

function searchParamsToRecord(params: URLSearchParams) {
  const search: Record<string, unknown> = {}

  params.forEach((value, key) => {
    if (key === 'page' || key === 'pageSize') {
      const parsed = Number(value)
      search[key] = Number.isNaN(parsed) ? value : parsed
      return
    }

    if (key === 'status' || key === 'role') {
      search[key] = value ? value.split(',') : []
      return
    }

    search[key] = value
  })

  return search
}

function recordToSearchParams(record: Record<string, unknown>) {
  const params = new URLSearchParams()

  Object.entries(record).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return

    if (Array.isArray(value)) {
      if (value.length > 0) params.set(key, value.join(','))
      return
    }

    params.set(key, String(value))
  })

  return params
}

function UsersPageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = useMemo(
    () => searchParamsToRecord(searchParams),
    [searchParams]
  )

  const navigate: NavigateFn = ({ search: nextSearch, replace }) => {
    const resolvedSearch =
      typeof nextSearch === 'function'
        ? nextSearch(search)
        : nextSearch === true
          ? search
          : nextSearch

    const params = recordToSearchParams({ ...search, ...resolvedSearch })
    const query = params.toString()
    const href = query ? `${pathname}?${query}` : pathname

    if (replace) {
      router.replace(href)
      return
    }

    router.push(href)
  }

  return (
    <UsersProvider>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <UsersTable data={users} search={search} navigate={navigate} />
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}

export default function UsersPage() {
  return (
    <Suspense>
      <UsersPageContent />
    </Suspense>
  )
}
