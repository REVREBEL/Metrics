"use client"

import React, { useState } from "react";
import { Button } from '@/components/ui/button'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { SubNav } from "@/components/sub-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { YearMonthSelector } from "@/widgets/YearMonthSelector/dynamic";

import { Analytics } from './components/analytics'
import { Overview } from './components/overview'
import { RecentSales } from './components/recent-sales'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const topNav = [
  {
    title: 'Channels',
    href: '/dashboard/channels',
    isActive: true,
    disabled: false,
    className: 'font-display text-md font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-4-inverse)] hover:text-accent',
  },
  {
    title: 'Segments',
    href: '/dashboard/segments',
    isActive: false,
    disabled: true,
    className: 'font-display text-md font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-4-inverse)] hover:text-accent',
  },
  {
    title: 'Room Types',
    href: '/dashboard/room-types',
    isActive: false,
    disabled: true,
    className: 'font-display text-md font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-4-inverse)] hover:text-accent',
  },
  {
    title: 'Demand',
    href: '/dashboard/demand',
    isActive: false,
    disabled: false,
    className: 'font-display text-md text-[var(--color-3-fade)] font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-3)] hover: [var(--color-1)]',
  },
  {
    title: 'Website',
    href: '/dashboard/website',
    isActive: false,
    disabled: false,
    className: 'font-display text-md font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-4-inverse)] hover:text-accent',
  },
]

export default function Page() {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  const handleDateChange = (year: string, month: string) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  return (<> <Header>

    {/* ===== Top Heading ===== */}
    <TopNav links={topNav} />
    <div className='ms-auto flex items-center space-x-4'>
      <Search />
      <ThemeSwitch />
      <ConfigDrawer />
      <ProfileDropdown />
    </div>

  </Header>
    <Main>
      {/* ===== Tabs ===== */}
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>Website</h1>
        <div className='flex items-center space-x-2'>
          <Button>Download</Button>
        </div>
      </div>

      <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
        <div className='w-full overflow-x-auto pb-2'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='analytics'>Analytics</TabsTrigger>
            <TabsTrigger value='performance'>Performance</TabsTrigger>
            <TabsTrigger value='reports'>Reports</TabsTrigger>
            <TabsTrigger value='notifications'>Notifications</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='overview' className='space-y-4'>

        {/* ===== Main ===== */}
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-4 w-4 text-muted-foreground'
              >
                <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$45,231.89</div>
              <p className='text-xs text-muted-foreground'>
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Subscriptions
              </CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-4 w-4 text-muted-foreground'
              >
                <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                <circle cx='9' cy='7' r='4' />
                <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+2350</div>
              <p className='text-xs text-muted-foreground'>
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Sales</CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-4 w-4 text-muted-foreground'>
                <rect width='20' height='14' x='2' y='5' rx='2' />
                <path d='M2 10h20' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+12,234</div>
              <p className='text-xs text-muted-foreground'>
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Active Now
              </CardTitle>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                className='h-4 w-4 text-muted-foreground'
              >
                <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
              </svg>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+573</div>
              <p className='text-xs text-muted-foreground'>
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
          <Card className='col-span-1 lg:col-span-4'>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className='ps-2'>
              <Overview />
            </CardContent>
          </Card>
          <Card className='col-span-1 lg:col-span-3'>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
        </TabsContent>    
        <TabsContent value='analytics' className='space-y-4'>
          <Analytics />
        </TabsContent>

      </Tabs>
    </Main>
  </>
  )
}
