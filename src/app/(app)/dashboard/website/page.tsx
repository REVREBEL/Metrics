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
import { DashboardTabs } from '../components/dashboard-tabs'
import { YearMonthSelector } from "@/widgets/YearMonthSelector/dynamic";

import ArrowCircleDown from "@/assets/rebel-icons/ArrowCircleDown";
import ArrowCircleUp from "@/assets/rebel-icons/ArrowCircleUp";

import SocialVisitsCard from "@/widgets/SocialVisitsCard";
import BrowserStatsCard from "@/widgets/BrowserStatsCard";
import AnalyticsOverview from "@/widgets/AnalyticsOverview";
import CampaignsSection from "@/widgets/CampaignsSection";
import TempAnalyticsDashboard from "@/widgets/TempAnalyticsDashboard";


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
    title: 'Metrics',
    href: '/dashboard',
    isActive: true,
    disabled: false,
    className: 'font-display text-md text-dark-blue-fade font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-dark-blue hover:text-light-blue-600',
  },
  {
    title: 'Segments',
    href: '/dashboard/segments',
    isActive: false,
    disabled: false,
    className: 'font-display text-md text-dark-blue-fade  font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-dark-blue hover:text-light-blue-600',
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
    className: 'font-display text-md text-dark-blue-fade  font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-dark-blue hover:text-light-blue-600',
  },

  {
    title: 'Demand',
    href: '/dashboard/demand',
    isActive: true,
    disabled: false,
    className: 'font-display text-md text-dark-blue-fade  font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-dark-blue hover:text-light-blue-600',
  },

  {
    title: 'Website',
    href: '/dashboard/website',
    isActive: false,
    disabled: false,
    className: 'font-display text-md text-dark-blue-fade  font-bold tracking-tight uppercase border-b-4 border-transparent data-[state=on]:border-current data-[state=on]:text-dark-blue hover:text-light-blue-600',
  }
]

function VarianceIndicator({
  value,
  positive,
}: {
  value: string;
  positive: boolean;
}) {
  const Icon = positive ? ArrowCircleUp : ArrowCircleDown;
  const color = positive ? 'var(--positive)' : 'var(--negative)';

  return (
    <p className='flex items-center gap-1 text-sm font-serif font-light' style={{ color }}>
      <Icon className='size-4 shrink-0' style={{ color }} />
      <span>{value}</span>
    </p>
  );
}


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
          title='Website'
          defaultValue='overview'
          globalSlot={
            <YearMonthSelector onSelectionChange={handleDateChange} />
          }
        >
          <DashboardTabs.Panel value='overview' title='Overview'>
            <div className='flex flex-1 flex-col gap-4 pt-0'>

              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 '>
                <Card className="retro-shadow-primary-md bg-white border border-primary rounded-sm ">
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 '>
                    <CardTitle className='font-display text-lg font-bold uppercase text-primary'>
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
                    <div className='font-serif text-4xl text-primary font-light mb-2'>$45,231.89</div>
                    <VarianceIndicator value='20.1% from last month' positive />
                  </CardContent>
                </Card>
                <Card className="retro-shadow-primary-md bg-white border border-primary rounded-sm ">
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='font-display text-lg font-bold uppercase text-primary'>
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
                    <div className='font-serif text-4xl text-primary  font-light mb-2'>2350</div>
                   <VarianceIndicator value='180.1% from last month' positive />
                  </CardContent>
                </Card>
                <Card className="retro-shadow-primary-md bg-white border border-primary rounded-sm ">
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='font-display text-lg font-bold uppercase text-primary'>
                      Sales
                    </CardTitle>
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
                    <div className='font-serif text-4xl text-primary  font-light mb-2'>12,234</div>
                     <VarianceIndicator value='19% from last month' positive />
                  </CardContent>
                </Card>
                <Card className="retro-shadow-primary-md bg-white border border-primary rounded-sm ">
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='font-display text-lg font-bold uppercase text-primary'>
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
                    <div className='font-serif text-4xl text-primary  font-light mb-2'>573</div>
                  <VarianceIndicator value='201 since last hour' positive />
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
            </div>
          </DashboardTabs.Panel>

          <DashboardTabs.Panel value='pace' title='Pace'>
            <div className='flex flex-1 flex-col gap-4 pt-0'>


            </div>


          </DashboardTabs.Panel>

          <DashboardTabs.Panel value='pickup' title='Pickup'>
            <div className='flex flex-1 flex-col gap-4 pt-0' />

            <Analytics />
            <TempAnalyticsDashboard />
            <AnalyticsOverview />
            <CampaignsSection />

          </DashboardTabs.Panel>

          <DashboardTabs.Panel value='reports' title='Reports'>
            <div className='flex flex-1 flex-col gap-4 pt-0' />

            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'></div>
            <SocialVisitsCard />
            <BrowserStatsCard />




          </DashboardTabs.Panel>


          <DashboardTabs.Panel value='insights' title='Insights'>
            <div className='flex flex-1 flex-col gap-4 pt-0' />



          </DashboardTabs.Panel>
        </DashboardTabs>
      </Main >
    </>
  );
}
