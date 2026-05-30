import { IconBarChart3, IconBookOpenCheck, IconBuilding2, IconDatabase, IconHeadphones, IconListChecks, IconMegaphone, IconMessageSquareText, IconSignal, Icon } from "@tabler/icons-react"
import { IconInnerShadowTop } from '@tabler/icons-react'
import type { SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: '',
    email: '',
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
          title: 'Metrics',
          url: '/dashboard',
          icon: BarChart3,
        },
        {
          title: 'Properties',
          url: '/properties',
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
          icon: Signal,
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
