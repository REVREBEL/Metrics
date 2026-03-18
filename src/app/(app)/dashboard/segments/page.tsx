"use client"
import React, { useState } from "react";
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { YearMonthSelector } from "@/widgets/YearMonthSelector/dynamic";
import { DashboardTabs } from '../components/dashboard-tabs'

import MarketSegmentTransientRoomsTable from "@/widgets/MarketSegmentTransientRoomsTable"
import OTBStackedBarChart from "@/widgets/OTBStackedBarChart"
import DailyPickupTable from "@/widgets/DailyPickupTable";

import { RevenueCard } from "@/widgets/metric-cards/RevenueCard";
import { SessionsCard } from "@/widgets/metric-cards/SessionsCard";
import { OverviewCard } from "@/widgets/metric-cards/OverviewCard";
import { GrowthCard } from "@/widgets/metric-cards/GrowthCard";
import { ProfitCard } from "@/widgets/metric-cards/ProfitCard";
import { CardHeaderData } from "@/widgets/metric-cards/components/card-header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";


const topNav = [
  {
    title: 'Metrics',
    href: '/dashboard',
    isActive: false,
    disabled: false,
    className: 'font-display text-md text-dark-blue-fade font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-dark-blue hover:text-light-blue-600',
  },
  {
    title: 'Segments',
    href: '/dashboard/segments',
    isActive: true,
    disabled: false,
    className: 'font-display text-md text-dark-blue-fade font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-dark-blue hover:text-light-blue-600',
  },

  {
    title: 'Channels',
    href: '/dashboard/channels',
    isActive: false,
    disabled: false,
    className: 'font-display text-md text-dark-blue-fade font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-dark-blue hover:text-light-blue-600',
  },

  {
    title: 'Room Types',
    href: '/dashboard/room-types',
    isActive: false,
    disabled: false,
    className: 'font-display text-md text-dark-blue-fade font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-dark-blue hover:text-light-blue-600',
  },

  {
    title: 'Demand',
    href: '/dashboard/demand',
    isActive: false,
    disabled: false,
    className: 'font-display text-md text-dark-blue-fade font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-dark-blue hover:text-light-blue-600',
  },

  {
    title: 'Website',
    href: '/dashboard/website',
    isActive: false,
    disabled: false,
    className: 'font-display text-md text-dark-blue-fade font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-dark-blue hover:text-light-blue-600',
  }
]

export default function Page() {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  const handleDateChange = (year: string, month: string) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  return (

    <> <Header>

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
        <DashboardTabs
          title='Segments'
          defaultValue='overview'
          globalSlot={
            <YearMonthSelector onSelectionChange={handleDateChange} />
          }
        >
          <DashboardTabs.Panel value='overview' title='Overview'>
            <div className='flex flex-1 flex-col gap-4 pt-0'>
              {selectedYear && selectedMonth ? (
                <MarketSegmentTransientRoomsTable
                  year={selectedYear}
                  month={selectedMonth}
                />
              ) : null}
            </div>

            <div className='flex flex-1 flex-col gap-4 pt-0'>
              {selectedYear && selectedMonth ? (
                <OTBStackedBarChart
                  year={selectedYear}
                  month={selectedMonth}
                />
              ) : null}
            </div>
          </DashboardTabs.Panel>

          <DashboardTabs.Panel value='pace' title='Pace'>
            <div className='flex flex-1 flex-col gap-4 pt-0'>
              {selectedYear && selectedMonth ? (
                <DailyPickupTable
                  year={selectedYear}
                  month={selectedMonth}
                />
              ) : null}
            </div>
          </DashboardTabs.Panel>

          <DashboardTabs.Panel value='pickup' title='Pickup'>
            <div className='flex flex-1 flex-col gap-4 pt-0' />

            <div className="p-8 bg-[#E9F1F3] min-h-screen">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <RevenueCard />
                <SessionsCard />
                <Card className="p-6 h-64 border-none shadow-md">
                  <CardHeaderData value="$22.6k" change="+38%" label="Total sales" />
                </Card>
                <OverviewCard />
                <GrowthCard />
                <ProfitCard />
              </div>
            </div>

          </DashboardTabs.Panel>

          <DashboardTabs.Panel value='reports' title='Reports'>
            <div className='flex flex-1 flex-col gap-4 pt-0' />




          </DashboardTabs.Panel>

          <DashboardTabs.Panel value='insights' title='Insights'>
            <div className='flex flex-1 flex-col gap-4 pt-0' />


          </DashboardTabs.Panel>
        </DashboardTabs>
      </Main >
    </>
  );
}
