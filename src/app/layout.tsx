import { ClerkProvider } from "@clerk/nextjs"

import "@/app/globals.css";
import "@/styles/metric-theme-tokens.css";
import "@/styles/metric-theme-sources.css";
import "@/styles/metric-cards.css";
import "@/styles/metric-layout.css";
import "@/styles/metric-card-overrides.css";
import "@/styles/metric-card-header-overrides.css";
import "@/styles/metric-card-color-overrides.css";
import "@/styles/metric-card-chart-overrides.css";
import "@/styles/top-channels-chart.css";
import "@/styles/calendar-heatmap.css";
import "@/styles/analytics-section.css";
import "@/styles/campaigns-section.css";
import "@/styles/posts-section.css";
import "@/styles/model-comparison-card.css";
import "@/styles/daily-pickup-table.css";
import "@/styles/dashboard-section.css";
import "@/styles/overview-section.css";
import "@/styles/widget-props-showcase.css";
import "@/styles/metric-layout-showcase.css";
import "@/styles/page-traffic-card.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  
  // Skip ClerkProvider if no publishable key is set (development without Clerk)
  if (!publishableKey) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>{children}</body>
      </html>
    )
  }
  
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en" suppressHydrationWarning>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
