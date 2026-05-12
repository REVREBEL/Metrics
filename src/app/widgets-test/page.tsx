"use client";
// @ts-nocheck

import React, { Component, ErrorInfo, ReactNode } from "react";
import dynamic from "next/dynamic";

// Error boundary to prevent one broken widget from taking down the page
class ErrorBoundary extends Component<{children: ReactNode, name: string}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 text-red-800 rounded">
          <h3 className="font-bold">Failed to render {this.props.name}</h3>
          <p className="text-xs mt-2 overflow-auto max-h-32">{String(this.state.error)}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Default_widgetsAnalyticsOverview = dynamic(() => import("@/widgets/AnalyticsOverview"), { ssr: false });
const Default_widgetsAnalyticsSection = dynamic(() => import("@/widgets/AnalyticsSection"), { ssr: false });
const Named_ChartAreaInteractive_widgetsAreaChartInterActive = dynamic(() => import("@/widgets/AreaChartInterActive").then(mod => mod.ChartAreaInteractive), { ssr: false });
const Named_ChartBarInteractive_widgetsBarChartInteractive = dynamic(() => import("@/widgets/BarChartInteractive").then(mod => mod.ChartBarInteractive), { ssr: false });
const Named_ChartBarLabelCustom_widgetsBarWithLabelCustom = dynamic(() => import("@/widgets/BarWithLabelCustom").then(mod => mod.ChartBarLabelCustom), { ssr: false });
const Default_widgetsBrowserStatsCard = dynamic(() => import("@/widgets/BrowserStatsCard"), { ssr: false });
const Default_widgetsBudgetSnapshotCard = dynamic(() => import("@/widgets/BudgetSnapshotCard"), { ssr: false });
const Default_widgetsCalendarHeatmap = dynamic(() => import("@/widgets/CalendarHeatmap"), { ssr: false });
const Default_widgetsCampaignsSection = dynamic(() => import("@/widgets/CampaignsSection"), { ssr: false });
const Default_widgetsChartsGrid = dynamic(() => import("@/widgets/ChartsGrid"), { ssr: false });
const Default_widgetsConversionCard = dynamic(() => import("@/widgets/ConversionCard"), { ssr: false });
const Default_widgetsDailyPickupTable = dynamic(() => import("@/widgets/DailyPickupTable"), { ssr: false });
const Default_widgetsDashboardDropdown = dynamic(() => import("@/widgets/DashboardDropdown"), { ssr: false });
const Default_widgetsDashboardSection = dynamic(() => import("@/widgets/DashboardSection"), { ssr: false });
const Default_widgetsDataTable = dynamic(() => import("@/widgets/DataTable"), { ssr: false });
const Default_widgetsEmptyState = dynamic(() => import("@/widgets/EmptyState"), { ssr: false });
const Default_widgetsLineChartInteractive = dynamic(() => import("@/widgets/LineChartInteractive"), { ssr: false });
const Default_widgetsMarketSegmentGroupRoomsTable = dynamic(() => import("@/widgets/MarketSegmentGroupRoomsTable"), { ssr: false });
const Default_widgetsMarketSegmentTransientRoomsTable = dynamic(() => import("@/widgets/MarketSegmentTransientRoomsTable"), { ssr: false });
const Default_widgetsModelComparisonCard = dynamic(() => import("@/widgets/ModelComparisonCard"), { ssr: false });
const Default_widgetsOTBStackedBarChart = dynamic(() => import("@/widgets/OTBStackedBarChart"), { ssr: false });
const Default_widgetsOverviewSection = dynamic(() => import("@/widgets/OverviewSection"), { ssr: false });
const Default_widgetsPerformanceCard = dynamic(() => import("@/widgets/PerformanceCard"), { ssr: false });
const Default_widgetsPerformanceCardOther = dynamic(() => import("@/widgets/PerformanceCardOther"), { ssr: false });
const Named_ChartPieDonutText_widgetsPieChartDonutCenterText = dynamic(() => import("@/widgets/PieChartDonutCenterText").then(mod => mod.ChartPieDonutText), { ssr: false });
const Named_ChartPieInteractive_widgetsPieChartInteractive = dynamic(() => import("@/widgets/PieChartInteractive").then(mod => mod.ChartPieInteractive), { ssr: false });
const Named_ChartPieDonutActive_widgetsPieDonutChartActive = dynamic(() => import("@/widgets/PieDonutChartActive").then(mod => mod.ChartPieDonutActive), { ssr: false });
const Default_widgetsPostsSection = dynamic(() => import("@/widgets/PostsSection"), { ssr: false });
const Named_ChartRadialLabel_widgetsRadialRingChartWithLabel = dynamic(() => import("@/widgets/RadialRingChartWithLabel").then(mod => mod.ChartRadialLabel), { ssr: false });
const Default_widgetsSalesMetrics = dynamic(() => import("@/widgets/SalesMetrics"), { ssr: false });
const Default_widgetsSalesMetricsCard = dynamic(() => import("@/widgets/SalesMetricsCard"), { ssr: false });
const Default_widgetsSimpleKPICards = dynamic(() => import("@/widgets/SimpleKPICards"), { ssr: false });
const Default_widgetsSimpleStatisticsCards = dynamic(() => import("@/widgets/SimpleStatisticsCards"), { ssr: false });
const Default_widgetsSocialVisitsCard = dynamic(() => import("@/widgets/SocialVisitsCard"), { ssr: false });
const Default_widgetsStatCard1 = dynamic(() => import("@/widgets/StatCard1"), { ssr: false });
const Default_widgetsStatisticsCardFin = dynamic(() => import("@/widgets/StatisticsCardFin"), { ssr: false });
const Default_widgetsTempAnalyticsDashboard = dynamic(() => import("@/widgets/TempAnalyticsDashboard"), { ssr: false });
const Default_widgetsTopServicesBarChart = dynamic(() => import("@/widgets/TopServicesBarChart"), { ssr: false });
const Default_widgetsTopServicesChart = dynamic(() => import("@/widgets/TopServicesChart"), { ssr: false });
const Default_widgetsTotalEarningCard = dynamic(() => import("@/widgets/TotalEarningCard"), { ssr: false });
const Default_widgetsTotalStatsCard = dynamic(() => import("@/widgets/TotalStatsCard"), { ssr: false });
const Named_YearMonthSelector_widgetsYearMonthSelector = dynamic(() => import("@/widgets/YearMonthSelector").then(mod => mod.YearMonthSelector), { ssr: false });
const Named_ActiveUsersGenderCard_widgetsmetriccardsActiveUsersAnalytics = dynamic(() => import("@/widgets/metric-cards/ActiveUsersAnalytics").then(mod => mod.ActiveUsersGenderCard), { ssr: false });
const Named_ActiveUsersInterestsCard_widgetsmetriccardsActiveUsersAnalytics = dynamic(() => import("@/widgets/metric-cards/ActiveUsersAnalytics").then(mod => mod.ActiveUsersInterestsCard), { ssr: false });
const Named_ActiveUsersAgeCard_widgetsmetriccardsActiveUsersAnalytics = dynamic(() => import("@/widgets/metric-cards/ActiveUsersAnalytics").then(mod => mod.ActiveUsersAgeCard), { ssr: false });

const Named_GrowthCard_widgetsmetriccardsGrowthCard = dynamic(() => import("@/widgets/metric-cards/GrowthCard").then(mod => mod.GrowthCard), { ssr: false });
const Named_OverviewCard_widgetsmetriccardsOverviewCard = dynamic(() => import("@/widgets/metric-cards/OverviewCard").then(mod => mod.OverviewCard), { ssr: false });
const Named_ProfitCard_widgetsmetriccardsProfitCard = dynamic(() => import("@/widgets/metric-cards/ProfitCard").then(mod => mod.ProfitCard), { ssr: false });
const Named_RevenueCard_widgetsmetriccardsRevenueCard = dynamic(() => import("@/widgets/metric-cards/RevenueCard").then(mod => mod.RevenueCard), { ssr: false });
const Named_SessionsCard_widgetsmetriccardsSessionsCard = dynamic(() => import("@/widgets/metric-cards/SessionsCard").then(mod => mod.SessionsCard), { ssr: false });

export default function WidgetsTestPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">All Widgets ({51})</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/AnalyticsOverview (Default)">@/widgets/AnalyticsOverview (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/AnalyticsOverview (Default)">
              <Default_widgetsAnalyticsOverview />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/AnalyticsSection (Default)">@/widgets/AnalyticsSection (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/AnalyticsSection (Default)">
              <Default_widgetsAnalyticsSection />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/AreaChartInterActive (ChartAreaInteractive)">@/widgets/AreaChartInterActive (ChartAreaInteractive)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/AreaChartInterActive (ChartAreaInteractive)">
              <Named_ChartAreaInteractive_widgetsAreaChartInterActive />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/BarChartInteractive (ChartBarInteractive)">@/widgets/BarChartInteractive (ChartBarInteractive)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/BarChartInteractive (ChartBarInteractive)">
              <Named_ChartBarInteractive_widgetsBarChartInteractive />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/BarWithLabelCustom (ChartBarLabelCustom)">@/widgets/BarWithLabelCustom (ChartBarLabelCustom)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/BarWithLabelCustom (ChartBarLabelCustom)">
              <Named_ChartBarLabelCustom_widgetsBarWithLabelCustom />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/BrowserStatsCard (Default)">@/widgets/BrowserStatsCard (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/BrowserStatsCard (Default)">
              <Default_widgetsBrowserStatsCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/BudgetSnapshotCard (Default)">@/widgets/BudgetSnapshotCard (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/BudgetSnapshotCard (Default)">
              <Default_widgetsBudgetSnapshotCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/CalendarHeatmap (Default)">@/widgets/CalendarHeatmap (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/CalendarHeatmap (Default)">
              <Default_widgetsCalendarHeatmap />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/CampaignsSection (Default)">@/widgets/CampaignsSection (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/CampaignsSection (Default)">
              <Default_widgetsCampaignsSection />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/ChartsGrid (Default)">@/widgets/ChartsGrid (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/ChartsGrid (Default)">
              <Default_widgetsChartsGrid />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/ConversionCard (Default)">@/widgets/ConversionCard (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/ConversionCard (Default)">
              <Default_widgetsConversionCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/DailyPickupTable (Default)">@/widgets/DailyPickupTable (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/DailyPickupTable (Default)">
              <Default_widgetsDailyPickupTable />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/DashboardDropdown (Default)">@/widgets/DashboardDropdown (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/DashboardDropdown (Default)">
              <Default_widgetsDashboardDropdown />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/DashboardSection (Default)">@/widgets/DashboardSection (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/DashboardSection (Default)">
              <Default_widgetsDashboardSection />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/DataTable (Default)">@/widgets/DataTable (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/DataTable (Default)">
              <Default_widgetsDataTable />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/EmptyState (Default)">@/widgets/EmptyState (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/EmptyState (Default)">
              <Default_widgetsEmptyState />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/LineChartInteractive (Default)">@/widgets/LineChartInteractive (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/LineChartInteractive (Default)">
              <Default_widgetsLineChartInteractive />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/LineChartInteractive (ChartLineInteractive)">@/widgets/LineChartInteractive (ChartLineInteractive)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/LineChartInteractive (ChartLineInteractive)">
              <Default_widgetsLineChartInteractive />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/MarketSegmentGroupRoomsTable (Default)">@/widgets/MarketSegmentGroupRoomsTable (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/MarketSegmentGroupRoomsTable (Default)">
              <Default_widgetsMarketSegmentGroupRoomsTable />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/MarketSegmentTransientRoomsTable (Default)">@/widgets/MarketSegmentTransientRoomsTable (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/MarketSegmentTransientRoomsTable (Default)">
              <Default_widgetsMarketSegmentTransientRoomsTable />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/ModelComparisonCard (Default)">@/widgets/ModelComparisonCard (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/ModelComparisonCard (Default)">
              <Default_widgetsModelComparisonCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/OTBStackedBarChart (Default)">@/widgets/OTBStackedBarChart (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/OTBStackedBarChart (Default)">
              <Default_widgetsOTBStackedBarChart />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/OverviewSection (Default)">@/widgets/OverviewSection (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/OverviewSection (Default)">
              <Default_widgetsOverviewSection />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/PerformanceCard (Default)">@/widgets/PerformanceCard (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/PerformanceCard (Default)">
              <Default_widgetsPerformanceCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/PerformanceCardOther (Default)">@/widgets/PerformanceCardOther (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/PerformanceCardOther (Default)">
              <Default_widgetsPerformanceCardOther />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/PieChartDonutCenterText (ChartPieDonutText)">@/widgets/PieChartDonutCenterText (ChartPieDonutText)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/PieChartDonutCenterText (ChartPieDonutText)">
              <Named_ChartPieDonutText_widgetsPieChartDonutCenterText />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/PieChartInteractive (ChartPieInteractive)">@/widgets/PieChartInteractive (ChartPieInteractive)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/PieChartInteractive (ChartPieInteractive)">
              <Named_ChartPieInteractive_widgetsPieChartInteractive />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/PieDonutChartActive (ChartPieDonutActive)">@/widgets/PieDonutChartActive (ChartPieDonutActive)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/PieDonutChartActive (ChartPieDonutActive)">
              <Named_ChartPieDonutActive_widgetsPieDonutChartActive />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/PostsSection (Default)">@/widgets/PostsSection (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/PostsSection (Default)">
              <Default_widgetsPostsSection />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/RadialRingChartWithLabel (ChartRadialLabel)">@/widgets/RadialRingChartWithLabel (ChartRadialLabel)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/RadialRingChartWithLabel (ChartRadialLabel)">
              <Named_ChartRadialLabel_widgetsRadialRingChartWithLabel />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/SalesMetrics (Default)">@/widgets/SalesMetrics (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/SalesMetrics (Default)">
              <Default_widgetsSalesMetrics />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/SalesMetricsCard (Default)">@/widgets/SalesMetricsCard (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/SalesMetricsCard (Default)">
              <Default_widgetsSalesMetricsCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/SimpleKPICards (Default)">@/widgets/SimpleKPICards (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/SimpleKPICards (Default)">
              <Default_widgetsSimpleKPICards />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/SimpleStatisticsCards (Default)">@/widgets/SimpleStatisticsCards (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/SimpleStatisticsCards (Default)">
              <Default_widgetsSimpleStatisticsCards />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/SocialVisitsCard (Default)">@/widgets/SocialVisitsCard (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/SocialVisitsCard (Default)">
              <Default_widgetsSocialVisitsCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/StatCard1 (Default)">@/widgets/StatCard1 (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/StatCard1 (Default)">
              <Default_widgetsStatCard1 />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/StatisticsCardFin (Default)">@/widgets/StatisticsCardFin (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/StatisticsCardFin (Default)">
              <Default_widgetsStatisticsCardFin />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/TempAnalyticsDashboard (Default)">@/widgets/TempAnalyticsDashboard (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/TempAnalyticsDashboard (Default)">
              <Default_widgetsTempAnalyticsDashboard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/TopServicesBarChart (Default)">@/widgets/TopServicesBarChart (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/TopServicesBarChart (Default)">
              <Default_widgetsTopServicesBarChart />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/TopServicesChart (Default)">@/widgets/TopServicesChart (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/TopServicesChart (Default)">
              <Default_widgetsTopServicesChart />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/TotalEarningCard (Default)">@/widgets/TotalEarningCard (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/TotalEarningCard (Default)">
              <Default_widgetsTotalEarningCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/TotalStatsCard (Default)">@/widgets/TotalStatsCard (Default)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/TotalStatsCard (Default)">
              <Default_widgetsTotalStatsCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/YearMonthSelector (YearMonthSelector)">@/widgets/YearMonthSelector (YearMonthSelector)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/YearMonthSelector (YearMonthSelector)">
              <Named_YearMonthSelector_widgetsYearMonthSelector />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersGenderCard)">@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersGenderCard)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersGenderCard)">
              <Named_ActiveUsersGenderCard_widgetsmetriccardsActiveUsersAnalytics />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersInterestsCard)">@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersInterestsCard)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersInterestsCard)">
              <Named_ActiveUsersInterestsCard_widgetsmetriccardsActiveUsersAnalytics />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersAgeCard)">@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersAgeCard)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersAgeCard)">
              <Named_ActiveUsersAgeCard_widgetsmetriccardsActiveUsersAnalytics />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/metric-cards/GrowthCard (GrowthCard)">@/widgets/metric-cards/GrowthCard (GrowthCard)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/metric-cards/GrowthCard (GrowthCard)">
              <Named_GrowthCard_widgetsmetriccardsGrowthCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/metric-cards/OverviewCard (OverviewCard)">@/widgets/metric-cards/OverviewCard (OverviewCard)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/metric-cards/OverviewCard (OverviewCard)">
              <Named_OverviewCard_widgetsmetriccardsOverviewCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/metric-cards/ProfitCard (ProfitCard)">@/widgets/metric-cards/ProfitCard (ProfitCard)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/metric-cards/ProfitCard (ProfitCard)">
              <Named_ProfitCard_widgetsmetriccardsProfitCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/metric-cards/RevenueCard (RevenueCard)">@/widgets/metric-cards/RevenueCard (RevenueCard)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/metric-cards/RevenueCard (RevenueCard)">
              <Named_RevenueCard_widgetsmetriccardsRevenueCard />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm flex flex-col overflow-hidden">
          <h2 className="text-sm font-mono mb-4 text-slate-500 border-b pb-2 truncate" title="@/widgets/metric-cards/SessionsCard (SessionsCard)">@/widgets/metric-cards/SessionsCard (SessionsCard)</h2>
          <div className="flex-1 w-full overflow-auto flex flex-col items-stretch min-h-[300px]">
            <ErrorBoundary name="@/widgets/metric-cards/SessionsCard (SessionsCard)">
              <Named_SessionsCard_widgetsmetriccardsSessionsCard />
            </ErrorBoundary>
          </div>
        </div>
        
      </div>
    </div>
  );
}
