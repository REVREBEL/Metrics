"use client"

import type { ComponentType, ReactNode } from "react"
import React, { Component } from "react"


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

const Default_widgetsAnalyticsOverview = React.lazy("@/widgets/AnalyticsOverview") as unknown as WidgetComponent
const Default_widgetsAnalyticsSection = React.lazy("@/widgets/AnalyticsSection") as unknown as WidgetComponent
const Named_ChartAreaInteractive_widgetsAreaChartInterActive = React.lazy(() => import("@/widgets/AreaChartInterActive").then((mod) => ({ default: mod.ChartAreaInteractive }))) as unknown as WidgetComponent
const Named_ChartBarInteractive_widgetsBarChartInteractive = React.lazy(() => import("@/widgets/BarChartInteractive").then((mod) => ({ default: mod.ChartBarInteractive }))) as unknown as WidgetComponent
const Named_ChartBarLabelCustom_widgetsBarWithLabelCustom = React.lazy(() => import("@/widgets/BarWithLabelCustom").then((mod) => ({ default: mod.ChartBarLabelCustom }))) as unknown as WidgetComponent
const Default_widgetsBrowserStatsCard = React.lazy("@/widgets/BrowserStatsCard") as unknown as WidgetComponent
const Default_widgetsBudgetSnapshotCard = React.lazy("@/widgets/BudgetSnapshotCard") as unknown as WidgetComponent
const Default_widgetsCalendarHeatmap = React.lazy("@/widgets/CalendarHeatmap") as unknown as WidgetComponent
const Default_widgetsCampaignsSection = React.lazy("@/widgets/CampaignsSection") as unknown as WidgetComponent
const Default_widgetsChartsGrid = React.lazy(() => import("@/widgets/ChartsGrid").then((m: any) => m.default ? m : { default: m.default || Object.values(m)[0] })) as unknown as WidgetComponent
const Default_widgetsConversionCard = React.lazy("@/widgets/ConversionCard") as unknown as WidgetComponent
const Default_widgetsDailyPickupTable = React.lazy("@/widgets/DailyPickupTable") as unknown as WidgetComponent
const Default_widgetsDashboardDropdown = React.lazy("@/widgets/DashboardDropdown") as unknown as WidgetComponent
const Default_widgetsDashboardSection = React.lazy("@/widgets/DashboardSection") as unknown as WidgetComponent
const Default_widgetsDataTable = React.lazy(() => import("@/widgets/DataTable").then((m: any) => m.default ? m : { default: m.default || Object.values(m)[0] })) as unknown as WidgetComponent
const Default_widgetsEmptyState = React.lazy(() => import("@/widgets/EmptyState").then((m: any) => m.default ? m : { default: m.default || Object.values(m)[0] })) as unknown as WidgetComponent
const Default_widgetsLineChartInteractive = React.lazy("@/widgets/LineChartInteractive") as unknown as WidgetComponent
const Default_widgetsMarketSegmentGroupRoomsTable = React.lazy("@/widgets/MarketSegmentGroupRoomsTable") as unknown as WidgetComponent
const Default_widgetsMarketSegmentTransientRoomsTable = React.lazy("@/widgets/MarketSegmentTransientRoomsTable") as unknown as WidgetComponent
const Default_widgetsModelComparisonCard = React.lazy("@/widgets/ModelComparisonCard") as unknown as WidgetComponent
const Default_widgetsOTBStackedBarChart = React.lazy("@/widgets/OTBStackedBarChart") as unknown as WidgetComponent
const Default_widgetsOverviewSection = React.lazy("@/widgets/OverviewSection") as unknown as WidgetComponent
const Default_widgetsPerformanceCard = React.lazy("@/widgets/PerformanceCard") as unknown as WidgetComponent
const Default_widgetsPerformanceCardOther = React.lazy("@/widgets/PerformanceCardOther") as unknown as WidgetComponent
const Named_ChartPieDonutText_widgetsPieChartDonutCenterText = React.lazy(() => import("@/widgets/PieChartDonutCenterText").then((mod) => ({ default: mod.ChartPieDonutText }))) as unknown as WidgetComponent
const Named_ChartPieInteractive_widgetsPieChartInteractive = React.lazy(() => import("@/widgets/PieChartInteractive").then((mod) => ({ default: mod.ChartPieInteractive }))) as unknown as WidgetComponent
const Named_ChartPieDonutActive_widgetsPieDonutChartActive = React.lazy(() => import("@/widgets/PieDonutChartActive").then((mod) => ({ default: mod.ChartPieDonutActive }))) as unknown as WidgetComponent
const Default_widgetsPostsSection = React.lazy(() => import("@/widgets/PostsSection").then((m: any) => m.default ? m : { default: m.default || Object.values(m)[0] })) as unknown as WidgetComponent
const Named_ChartRadialLabel_widgetsRadialRingChartWithLabel = React.lazy(() => import("@/widgets/RadialRingChartWithLabel").then((mod) => ({ default: mod.ChartRadialLabel }))) as unknown as WidgetComponent
const Default_widgetsSalesMetrics = React.lazy("@/widgets/SalesMetrics") as unknown as WidgetComponent
const Default_widgetsSalesMetricsCard = React.lazy("@/widgets/SalesMetricsCard") as unknown as WidgetComponent
const Default_widgetsSimpleKPICards = React.lazy("@/widgets/SimpleKPICards") as unknown as WidgetComponent
const Default_widgetsSimpleStatisticsCards = React.lazy("@/widgets/SimpleStatisticsCards") as unknown as WidgetComponent
const Default_widgetsSocialVisitsCard = React.lazy("@/widgets/SocialVisitsCard") as unknown as WidgetComponent
const Default_widgetsStatCard1 = React.lazy(() => import("@/widgets/StatCard1").then((m: any) => m.default ? m : { default: m.default || Object.values(m)[0] })) as unknown as WidgetComponent
const Default_widgetsStatisticsCardFin = React.lazy("@/widgets/StatisticsCardFin") as unknown as WidgetComponent
const Default_widgetsTempAnalyticsDashboard = React.lazy("@/widgets/TempAnalyticsDashboard") as unknown as WidgetComponent
const Default_widgetsTopServicesBarChart = React.lazy("@/widgets/TopServicesBarChart") as unknown as WidgetComponent
const Default_widgetsTopServicesChart = React.lazy("@/widgets/TopServicesChart") as unknown as WidgetComponent
const Default_widgetsTotalEarningCard = React.lazy("@/widgets/TotalEarningCard") as unknown as WidgetComponent
const Default_widgetsTotalStatsCard = React.lazy("@/widgets/TotalStatsCard") as unknown as WidgetComponent
const Named_YearMonthSelector_widgetsYearMonthSelector = React.lazy(() => import("@/widgets/YearMonthSelector").then((mod) => ({ default: mod.YearMonthSelector }))) as unknown as WidgetComponent
const Named_ActiveUsersGenderCard_widgetsmetriccardsActiveUsersAnalytics = React.lazy(() => import("@/widgets/metric-cards/ActiveUsersAnalytics").then((mod) => ({ default: mod.ActiveUsersGenderCard }))) as unknown as WidgetComponent
const Named_ActiveUsersInterestsCard_widgetsmetriccardsActiveUsersAnalytics = React.lazy(() => import("@/widgets/metric-cards/ActiveUsersAnalytics").then((mod) => ({ default: mod.ActiveUsersInterestsCard }))) as unknown as WidgetComponent
const Named_ActiveUsersAgeCard_widgetsmetriccardsActiveUsersAnalytics = React.lazy(() => import("@/widgets/metric-cards/ActiveUsersAnalytics").then((mod) => ({ default: mod.ActiveUsersAgeCard }))) as unknown as WidgetComponent
const Named_GrowthCard_widgetsmetriccardsGrowthCard = React.lazy(() => import("@/widgets/metric-cards/GrowthCard").then((mod) => ({ default: mod.GrowthCard }))) as unknown as WidgetComponent
const Named_OverviewCard_widgetsmetriccardsOverviewCard = React.lazy(() => import("@/widgets/metric-cards/OverviewCard").then((mod) => ({ default: mod.OverviewCard }))) as unknown as WidgetComponent
const Named_ProfitCard_widgetsmetriccardsProfitCard = React.lazy(() => import("@/widgets/metric-cards/ProfitCard").then((mod) => ({ default: mod.ProfitCard }))) as unknown as WidgetComponent
const Named_RevenueCard_widgetsmetriccardsRevenueCard = React.lazy(() => import("@/widgets/metric-cards/RevenueCard").then((mod) => ({ default: mod.RevenueCard }))) as unknown as WidgetComponent
const Named_SessionsCard_widgetsmetriccardsSessionsCard = React.lazy(() => import("@/widgets/metric-cards/SessionsCard").then((mod) => ({ default: mod.SessionsCard }))) as unknown as WidgetComponent

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
