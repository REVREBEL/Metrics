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
import MarketSegmentTransientRoomsTable from "@/widgets/MarketSegmentTransientRoomsTable"
import OTBStackedBarChart from "@/widgets/OTBStackedBarChart"
import { YearMonthSelector } from "@/widgets/YearMonthSelector/dynamic";

const topNav = [
  {
    title: 'Segment',
    href: '/dashboard/segment',
    isActive: true,
    disabled: false,
    className: 'font-display text-md font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-4-inverse)] hover:text-accent',
  },
  {
    title: 'Pickup',
    href: '/dashboard/pickup',
    isActive: false,
    disabled: true,
    className: 'font-display text-md font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-4-inverse)] hover:text-accent',
  },
  {
    title: 'Pace',
    href: '/dashboard/pace',
    isActive: false,
    disabled: true,
    className: 'font-display text-md font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-[var(--color-4-inverse)] hover:text-accent',
  },
  {
    title: 'Performance',
    href: '/dashboard/performance',
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

  return (
    <>
      <Header>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>



      </Main>
    </>
  )
}
