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

import MarketSegmentTransientRoomsTable from "@/widgets/MarketSegmentTransientRoomsTable"
import OTBStackedBarChart from "@/widgets/OTBStackedBarChart"
import DailyPickupTable from "@/widgets/DailyPickupTable"


const topNav = [
  {
    title: 'Metrics',
    href: '/dashboard/dashboard',
    isActive: true,
    disabled: false,
    className: 'font-display text-md text-[var(--color-3-fade)] font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-3)] hover: [var(--color-1)]',
  },
  {
    title: 'Segments',
    href: '/dashboard/segments',
    isActive: true,
    disabled: false,
    className: 'font-display text-md text-[var(--color-3-fade)] font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-3)] hover: [var(--color-1)]',
  },
  {
    title: 'Channels',
    href: '/dashboard/channels',
    isActive: true,
    disabled: false,
    className: 'font-display text-md text-[var(--color-3-fade)] font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-3)] hover: [var(--color-1)]',
  },
  {
    title: 'Room Types',
    href: '/dashboard/room-types',
    isActive: true,
    disabled: false,
    className: 'font-display text-md text-[var(--color-3-fade)] font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-3)] hover: [var(--color-1)]',
  },
  {
    title: 'Demand',
    href: '/dashboard/demand',
    isActive: true,
    disabled: false,
    className: 'font-display text-md text-[var(--color-3-fade)] font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-3)] hover: [var(--color-1)]',
  },
  {
    title: 'Website',
    href: '/dashboard/website',
    isActive: true,
    disabled: false,
    className: 'font-display text-md text-[var(--color-3-fade)] font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-3)] hover: [var(--color-1)]',
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

    {/* ===== Main ===== */}
    <Main fluid>

      {/* ===== Tabs ===== */}
      <Tabs orientation='vertical' defaultValue='overview' className='space-y-4 shadow-none'>
        <SubNav>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-3xl font-bold font-display uppercase tracking-tight'>Segments</h1>
            <div className='flex items-center space-x-2'>
              <Button>Download</Button>
            </div>
          </div>

          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger
                value='performance'
                className="h-8 justify-center text-md font-display font-bold uppercase text-muted-foreground transition-all data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-secondary hover:text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-muted-foreground">
                Performance
              </TabsTrigger>
              <TabsTrigger
                value='pace'
                className="h-8 justify-center text-md font-display font-bold uppercase text-muted-foreground transition-all data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-secondary hover:text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-muted-foreground">
                Pace
              </TabsTrigger>
              <TabsTrigger
                value='pickup'
                className="h-8 justify-center text-md font-display font-bold uppercase text-muted-foreground transition-all data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-secondary hover:text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-muted-foreground">
                Pickup
              </TabsTrigger>
              <TabsTrigger
                value='reports'
                className="h-8 justify-center text-md font-display font-bold uppercase text-muted-foreground transition-all data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-secondary hover:text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-muted-foreground">
                Reports
              </TabsTrigger>
              <TabsTrigger
                value='notifications'
                className="h-8 justify-center text-md font-display font-bold uppercase text-muted-foreground transition-all data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-secondary hover:text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-muted-foreground">
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>
        </SubNav>

        {/* ===== Performance Tab===== */}
        <TabsContent value='performance' className='space-y-4'>
          <YearMonthSelector onSelectionChange={handleDateChange} />

          <div className="flex flex-1 flex-col pt-0 gap-4">
            {selectedYear && selectedMonth && (
              <
                MarketSegmentTransientRoomsTable
                year={selectedYear} month={selectedMonth}
              />
            )}
          </div>

          <div className="flex flex-1 flex-col pt-0 gap-4">
            {selectedYear && selectedMonth && (
              <
                OTBStackedBarChart
                year={selectedYear} month={selectedMonth}
              />
            )}
          </div>
        </TabsContent>

        {/* ===== Pace Tab===== */}
        <TabsContent value='pace' className='space-y-4'>
          <YearMonthSelector onSelectionChange={handleDateChange} />

          <div className="flex flex-1 flex-col pt-0 gap-4">

          </div>
        </TabsContent>

        {/* ===== Pickup Tab===== */}
        <TabsContent value='pickup' className='space-y-4'>
          <YearMonthSelector onSelectionChange={handleDateChange} />

          <div className="flex flex-1 flex-col pt-0 gap-4">
            {selectedYear && selectedMonth && (
              <
                DailyPickupTable
                year={selectedYear} month={selectedMonth}
              />
            )}
          </div>
        </TabsContent>

        {/* ===== Reports Tab===== */}
        <TabsContent value='reports' className='space-y-4'>
          <YearMonthSelector onSelectionChange={handleDateChange} />

          <div className="flex flex-1 flex-col pt-0 gap-4">

          </div>
        </TabsContent>

      </Tabs>
    </Main>
  </>
  )
}


