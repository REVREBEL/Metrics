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
import PerformanceCardOther from "@/widgets/PerformanceCardOther"
import { YearMonthSelector } from "@/widgets/YearMonthSelector/dynamic";




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
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='font-display text-3xl font-bold tracking-widest uppercase'>Dashboard Metrics</h1>
          <div className='flex items-center'>
            <Button>Download</Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col pt-0 gap-4">
          <YearMonthSelector onSelectionChange={handleDateChange} />
          {selectedYear && selectedMonth && (
            <PerformanceCardOther year={selectedYear} month={selectedMonth} />
          )}
        </div>
      </Main>
    </>
  )
}
