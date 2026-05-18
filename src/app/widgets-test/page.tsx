"use client"

import type { ComponentType, ReactNode } from "react"
import React, { Component } from "react"
import dynamic from "next/dynamic"

class ErrorBoundary extends Component<
  { children: ReactNode; name: string },
  { hasError: boolean; error: unknown }
> {
  constructor(props: { children: ReactNode; name: string }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded bg-red-50 p-4 text-red-800">
          <h3 className="font-bold">Failed to render {this.props.name}</h3>
          <p className="mt-2 max-h-32 overflow-auto text-xs">
            {String(this.state.error)}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

type WidgetComponent = ComponentType<Record<string, unknown>>

type WidgetPreview = {
  title: string
  component: WidgetComponent
  props?: Record<string, unknown>
}

const defaultDateProps = {
  year: "2026",
  month: "05",
}

const Default_widgetsAnalyticsOverview = dynamic(
  () => import("@/widgets/AnalyticsOverview"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsAnalyticsSection = dynamic(
  () => import("@/widgets/AnalyticsSection"),
  { ssr: false }
) as WidgetComponent
const Named_ChartAreaInteractive_widgetsAreaChartInterActive = dynamic(
  () => import("@/widgets/AreaChartInterActive").then((mod) => mod.ChartAreaInteractive),
  { ssr: false }
) as WidgetComponent
const Named_ChartBarInteractive_widgetsBarChartInteractive = dynamic(
  () => import("@/widgets/BarChartInteractive").then((mod) => mod.ChartBarInteractive),
  { ssr: false }
) as WidgetComponent
const Named_ChartBarLabelCustom_widgetsBarWithLabelCustom = dynamic(
  () => import("@/widgets/BarWithLabelCustom").then((mod) => mod.ChartBarLabelCustom),
  { ssr: false }
) as WidgetComponent
const Default_widgetsBrowserStatsCard = dynamic(
  () => import("@/widgets/BrowserStatsCard"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsBudgetSnapshotCard = dynamic(
  () => import("@/widgets/BudgetSnapshotCard"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsCalendarHeatmap = dynamic(
  () => import("@/widgets/CalendarHeatmap"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsCampaignsSection = dynamic(
  () => import("@/widgets/CampaignsSection"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsChartsGrid = dynamic(() => import("@/widgets/ChartsGrid"), {
  ssr: false,
}) as WidgetComponent
const Default_widgetsConversionCard = dynamic(
  () => import("@/widgets/ConversionCard"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsDailyPickupTable = dynamic(
  () => import("@/widgets/DailyPickupTable"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsDashboardDropdown = dynamic(
  () => import("@/widgets/DashboardDropdown"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsDashboardSection = dynamic(
  () => import("@/widgets/DashboardSection"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsDataTable = dynamic(() => import("@/widgets/DataTable"), {
  ssr: false,
}) as WidgetComponent
const Default_widgetsEmptyState = dynamic(() => import("@/widgets/EmptyState"), {
  ssr: false,
}) as WidgetComponent
const Default_widgetsLineChartInteractive = dynamic(
  () => import("@/widgets/LineChartInteractive"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsMarketSegmentGroupRoomsTable = dynamic(
  () => import("@/widgets/MarketSegmentGroupRoomsTable"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsMarketSegmentTransientRoomsTable = dynamic(
  () => import("@/widgets/MarketSegmentTransientRoomsTable"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsModelComparisonCard = dynamic(
  () => import("@/widgets/ModelComparisonCard"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsOTBStackedBarChart = dynamic(
  () => import("@/widgets/OTBStackedBarChart"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsOverviewSection = dynamic(
  () => import("@/widgets/OverviewSection"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsPerformanceCard = dynamic(
  () => import("@/widgets/PerformanceCard"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsPerformanceCardOther = dynamic(
  () => import("@/widgets/PerformanceCardOther"),
  { ssr: false }
) as WidgetComponent
const Named_ChartPieDonutText_widgetsPieChartDonutCenterText = dynamic(
  () => import("@/widgets/PieChartDonutCenterText").then((mod) => mod.ChartPieDonutText),
  { ssr: false }
) as WidgetComponent
const Named_ChartPieInteractive_widgetsPieChartInteractive = dynamic(
  () => import("@/widgets/PieChartInteractive").then((mod) => mod.ChartPieInteractive),
  { ssr: false }
) as WidgetComponent
const Named_ChartPieDonutActive_widgetsPieDonutChartActive = dynamic(
  () => import("@/widgets/PieDonutChartActive").then((mod) => mod.ChartPieDonutActive),
  { ssr: false }
) as WidgetComponent
const Default_widgetsPostsSection = dynamic(() => import("@/widgets/PostsSection"), {
  ssr: false,
}) as WidgetComponent
const Named_ChartRadialLabel_widgetsRadialRingChartWithLabel = dynamic(
  () => import("@/widgets/RadialRingChartWithLabel").then((mod) => mod.ChartRadialLabel),
  { ssr: false }
) as WidgetComponent
const Default_widgetsSalesMetrics = dynamic(
  () => import("@/widgets/SalesMetrics"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsSalesMetricsCard = dynamic(
  () => import("@/widgets/SalesMetricsCard"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsSimpleKPICards = dynamic(
  () => import("@/widgets/SimpleKPICards"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsSimpleStatisticsCards = dynamic(
  () => import("@/widgets/SimpleStatisticsCards"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsSocialVisitsCard = dynamic(
  () => import("@/widgets/SocialVisitsCard"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsStatCard1 = dynamic(() => import("@/widgets/StatCard1"), {
  ssr: false,
}) as WidgetComponent
const Default_widgetsStatisticsCardFin = dynamic(
  () => import("@/widgets/StatisticsCardFin"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsTempAnalyticsDashboard = dynamic(
  () => import("@/widgets/TempAnalyticsDashboard"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsTopServicesBarChart = dynamic(
  () => import("@/widgets/TopServicesBarChart"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsTopServicesChart = dynamic(
  () => import("@/widgets/TopServicesChart"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsTotalEarningCard = dynamic(
  () => import("@/widgets/TotalEarningCard"),
  { ssr: false }
) as WidgetComponent
const Default_widgetsTotalStatsCard = dynamic(
  () => import("@/widgets/TotalStatsCard"),
  { ssr: false }
) as WidgetComponent
const Named_YearMonthSelector_widgetsYearMonthSelector = dynamic(
  () => import("@/widgets/YearMonthSelector").then((mod) => mod.YearMonthSelector),
  { ssr: false }
) as WidgetComponent
const Named_ActiveUsersGenderCard_widgetsmetriccardsActiveUsersAnalytics = dynamic(
  () =>
    import("@/widgets/metric-cards/ActiveUsersAnalytics").then(
      (mod) => mod.ActiveUsersGenderCard
    ),
  { ssr: false }
) as WidgetComponent
const Named_ActiveUsersInterestsCard_widgetsmetriccardsActiveUsersAnalytics = dynamic(
  () =>
    import("@/widgets/metric-cards/ActiveUsersAnalytics").then(
      (mod) => mod.ActiveUsersInterestsCard
    ),
  { ssr: false }
) as WidgetComponent
const Named_ActiveUsersAgeCard_widgetsmetriccardsActiveUsersAnalytics = dynamic(
  () =>
    import("@/widgets/metric-cards/ActiveUsersAnalytics").then(
      (mod) => mod.ActiveUsersAgeCard
    ),
  { ssr: false }
) as WidgetComponent
const Named_GrowthCard_widgetsmetriccardsGrowthCard = dynamic(
  () => import("@/widgets/metric-cards/GrowthCard").then((mod) => mod.GrowthCard),
  { ssr: false }
) as WidgetComponent
const Named_OverviewCard_widgetsmetriccardsOverviewCard = dynamic(
  () => import("@/widgets/metric-cards/OverviewCard").then((mod) => mod.OverviewCard),
  { ssr: false }
) as WidgetComponent
const Named_ProfitCard_widgetsmetriccardsProfitCard = dynamic(
  () => import("@/widgets/metric-cards/ProfitCard").then((mod) => mod.ProfitCard),
  { ssr: false }
) as WidgetComponent
const Named_RevenueCard_widgetsmetriccardsRevenueCard = dynamic(
  () => import("@/widgets/metric-cards/RevenueCard").then((mod) => mod.RevenueCard),
  { ssr: false }
) as WidgetComponent
const Named_SessionsCard_widgetsmetriccardsSessionsCard = dynamic(
  () => import("@/widgets/metric-cards/SessionsCard").then((mod) => mod.SessionsCard),
  { ssr: false }
) as WidgetComponent

const widgets: WidgetPreview[] = [
  { title: "@/widgets/AnalyticsOverview (Default)", component: Default_widgetsAnalyticsOverview },
  { title: "@/widgets/AnalyticsSection (Default)", component: Default_widgetsAnalyticsSection },
  { title: "@/widgets/AreaChartInterActive (ChartAreaInteractive)", component: Named_ChartAreaInteractive_widgetsAreaChartInterActive },
  { title: "@/widgets/BarChartInteractive (ChartBarInteractive)", component: Named_ChartBarInteractive_widgetsBarChartInteractive },
  { title: "@/widgets/BarWithLabelCustom (ChartBarLabelCustom)", component: Named_ChartBarLabelCustom_widgetsBarWithLabelCustom },
  { title: "@/widgets/BrowserStatsCard (Default)", component: Default_widgetsBrowserStatsCard },
  { title: "@/widgets/BudgetSnapshotCard (Default)", component: Default_widgetsBudgetSnapshotCard },
  { title: "@/widgets/CalendarHeatmap (Default)", component: Default_widgetsCalendarHeatmap },
  { title: "@/widgets/CampaignsSection (Default)", component: Default_widgetsCampaignsSection },
  { title: "@/widgets/ChartsGrid (Default)", component: Default_widgetsChartsGrid },
  { title: "@/widgets/ConversionCard (Default)", component: Default_widgetsConversionCard },
  { title: "@/widgets/DailyPickupTable (Default)", component: Default_widgetsDailyPickupTable },
  { title: "@/widgets/DashboardDropdown (Default)", component: Default_widgetsDashboardDropdown },
  { title: "@/widgets/DashboardSection (Default)", component: Default_widgetsDashboardSection },
  { title: "@/widgets/DataTable (Default)", component: Default_widgetsDataTable },
  { title: "@/widgets/EmptyState (Default)", component: Default_widgetsEmptyState },
  { title: "@/widgets/LineChartInteractive (Default)", component: Default_widgetsLineChartInteractive },
  { title: "@/widgets/LineChartInteractive (ChartLineInteractive)", component: Default_widgetsLineChartInteractive },
  { title: "@/widgets/MarketSegmentGroupRoomsTable (Default)", component: Default_widgetsMarketSegmentGroupRoomsTable },
  {
    title: "@/widgets/MarketSegmentTransientRoomsTable (Default)",
    component: Default_widgetsMarketSegmentTransientRoomsTable,
    props: defaultDateProps,
  },
  { title: "@/widgets/ModelComparisonCard (Default)", component: Default_widgetsModelComparisonCard },
  { title: "@/widgets/OTBStackedBarChart (Default)", component: Default_widgetsOTBStackedBarChart },
  { title: "@/widgets/OverviewSection (Default)", component: Default_widgetsOverviewSection },
  {
    title: "@/widgets/PerformanceCard (Default)",
    component: Default_widgetsPerformanceCard,
    props: defaultDateProps,
  },
  {
    title: "@/widgets/PerformanceCardOther (Default)",
    component: Default_widgetsPerformanceCardOther,
    props: defaultDateProps,
  },
  { title: "@/widgets/PieChartDonutCenterText (ChartPieDonutText)", component: Named_ChartPieDonutText_widgetsPieChartDonutCenterText },
  { title: "@/widgets/PieChartInteractive (ChartPieInteractive)", component: Named_ChartPieInteractive_widgetsPieChartInteractive },
  { title: "@/widgets/PieDonutChartActive (ChartPieDonutActive)", component: Named_ChartPieDonutActive_widgetsPieDonutChartActive },
  { title: "@/widgets/PostsSection (Default)", component: Default_widgetsPostsSection },
  { title: "@/widgets/RadialRingChartWithLabel (ChartRadialLabel)", component: Named_ChartRadialLabel_widgetsRadialRingChartWithLabel },
  { title: "@/widgets/SalesMetrics (Default)", component: Default_widgetsSalesMetrics },
  { title: "@/widgets/SalesMetricsCard (Default)", component: Default_widgetsSalesMetricsCard },
  { title: "@/widgets/SimpleKPICards (Default)", component: Default_widgetsSimpleKPICards },
  { title: "@/widgets/SimpleStatisticsCards (Default)", component: Default_widgetsSimpleStatisticsCards },
  { title: "@/widgets/SocialVisitsCard (Default)", component: Default_widgetsSocialVisitsCard },
  { title: "@/widgets/StatCard1 (Default)", component: Default_widgetsStatCard1 },
  { title: "@/widgets/StatisticsCardFin (Default)", component: Default_widgetsStatisticsCardFin },
  { title: "@/widgets/TempAnalyticsDashboard (Default)", component: Default_widgetsTempAnalyticsDashboard },
  { title: "@/widgets/TopServicesBarChart (Default)", component: Default_widgetsTopServicesBarChart },
  { title: "@/widgets/TopServicesChart (Default)", component: Default_widgetsTopServicesChart },
  { title: "@/widgets/TotalEarningCard (Default)", component: Default_widgetsTotalEarningCard },
  { title: "@/widgets/TotalStatsCard (Default)", component: Default_widgetsTotalStatsCard },
  { title: "@/widgets/YearMonthSelector (YearMonthSelector)", component: Named_YearMonthSelector_widgetsYearMonthSelector },
  { title: "@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersGenderCard)", component: Named_ActiveUsersGenderCard_widgetsmetriccardsActiveUsersAnalytics },
  { title: "@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersInterestsCard)", component: Named_ActiveUsersInterestsCard_widgetsmetriccardsActiveUsersAnalytics },
  { title: "@/widgets/metric-cards/ActiveUsersAnalytics (ActiveUsersAgeCard)", component: Named_ActiveUsersAgeCard_widgetsmetriccardsActiveUsersAnalytics },
  { title: "@/widgets/metric-cards/GrowthCard (GrowthCard)", component: Named_GrowthCard_widgetsmetriccardsGrowthCard },
  { title: "@/widgets/metric-cards/OverviewCard (OverviewCard)", component: Named_OverviewCard_widgetsmetriccardsOverviewCard },
  { title: "@/widgets/metric-cards/ProfitCard (ProfitCard)", component: Named_ProfitCard_widgetsmetriccardsProfitCard },
  { title: "@/widgets/metric-cards/RevenueCard (RevenueCard)", component: Named_RevenueCard_widgetsmetriccardsRevenueCard },
  { title: "@/widgets/metric-cards/SessionsCard (SessionsCard)", component: Named_SessionsCard_widgetsmetriccardsSessionsCard },
]

export default function WidgetsTestPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="mb-8 text-3xl font-bold">All Widgets ({widgets.length})</h1>
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {widgets.map(({ title, component: Widget, props }) => (
          <div
            key={title}
            className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2
              className="mb-4 truncate border-b pb-2 font-mono text-sm text-slate-500"
              title={title}
            >
              {title}
            </h2>
            <div className="flex min-h-[300px] flex-1 flex-col items-stretch overflow-auto">
              <ErrorBoundary name={title}>
                <Widget {...props} />
              </ErrorBoundary>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
