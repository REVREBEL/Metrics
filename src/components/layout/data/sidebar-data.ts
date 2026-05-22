import {
  BarChart3,
  BookOpenCheck,
  Building2,
  Database,
  Headphones,
  ListChecks,
  Megaphone,
  MessageSquareText,
  Signal,
} from 'lucide-react'
import { IconInnerShadowTop } from '@tabler/icons-react'
import type { SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Gary Stringham',
    email: 'gary@revrebel.io',
    avatar: '',
  },
  teams: [
    {
      name: 'Portfolio / All Properties',
      logo: IconInnerShadowTop,
      plan: 'Portfolio View',
    },
    {
      name: 'Property A',
      logo: Building2,
      plan: 'Hotel',
    },
    {
      name: 'Property B',
      logo: Building2,
      plan: 'Hotel',
    },
  ],
  navGroups: [
    {
      title: 'Metrics',
      items: [
        {
          title: 'Signals',
          url: '/dashboard',
          icon: Signal,
        },
        {
          title: 'Properties',
          url: '/hotels',
          icon: Building2,
        },
        {
          title: 'Growth Plan',
          url: '/tasks',
          icon: ListChecks,
        },
        {
          title: 'Broadcast',
          url: '/campaigns',
          icon: Megaphone,
        },
        {
          title: 'Signals',
          url: '/metric-library',
          icon: BarChart3,
        },
        {
          title: 'Data Library',
          url: '/data-library',
          icon: Database,
        },
        {
          title: 'The Playbook',
          url: '/strategies',
          icon: BookOpenCheck,
        },
        {
          title: 'Threads',
          url: '/chats',
          icon: MessageSquareText,
        },
        {
          title: 'Help Desk',
          url: '/help-desk',
          icon: Headphones,
        },
      ],
    },
  ],
}
