"use client"
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
      </Header>
   {/* ===== Main ===== */}
    <Main fluid>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <h1 className='text-3xl font-bold font-display uppercase tracking-tight'>REVREBEL TOOLKIT</h1>
      </div>
      {children}
    </Main>
    </>
  )
}
