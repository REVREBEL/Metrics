import "@/app/globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SidebarProvider>
          {/* Your AppSidebar component from the previous step */}
          <SidebarInset>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}