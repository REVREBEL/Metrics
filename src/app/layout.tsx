import "@/app/globals.css";
import "@/styles/metric-cards.css";
import "@/styles/metric-card-overrides.css";
import "@/styles/metric-card-header-overrides.css";
import "@/styles/metric-card-color-overrides.css";
import "@/styles/metric-card-chart-overrides.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
