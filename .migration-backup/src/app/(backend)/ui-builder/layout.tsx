import "@/app/globals.css";

import { Main } from '@/components/layout/main'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

          {/* Your AppSidebar component from the previous step */}
         <Main fluid>
            {children}
        </Main>
      </body>
    </html>
  );
}