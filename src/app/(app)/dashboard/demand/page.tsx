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

import CalendarHeatmap from "@/widgets/CalendarHeatmap"


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
    className: 'font-display text-md font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-4-inverse)] hover:text-accent',
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

    {/* ===== Tabs ===== */}
    <SubNav>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>Demand</h1>
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
        <TabsContent value='overview' className='space-y-4'></TabsContent>
      </Tabs>
    </SubNav>

    {/* ===== Main ===== */}
    <Main>
      <div className="flex flex-1 flex-col pt-0 gap-4">
        <YearMonthSelector onSelectionChange={handleDateChange} />
        {selectedYear && selectedMonth && (
          <></>
        )}
      </div>
    </Main>
  </>
  )
}
