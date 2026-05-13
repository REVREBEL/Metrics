import "@/app/globals.css";
import "@/styles/metric-cards.css";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
