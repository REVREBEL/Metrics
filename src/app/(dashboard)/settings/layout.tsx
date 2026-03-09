import { Settings } from '@/app/dashboard/settings'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Settings>{children}</Settings>;
}
