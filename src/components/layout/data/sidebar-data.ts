import { IconChartBarPopular, IconChecklist, IconBuilding, IconDatabase, IconHeadphones, IconListCheck, IconSpeakerphone, IconMessage, IconSignalE, Icon } from "@tabler/icons-react"
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
      logo: IconBuilding,
      plan: 'Hotel',
    },
    {
      name: 'Property B',
      logo: IconBuilding,
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
          icon: IconChartBarPopular,
        },
        {
          title: 'Properties',
          url: '/properties',
          icon: IconBuilding,
        },
        {
          title: 'Growth Plan',
          url: '/tasks',
          icon: IconListCheck,
        },
        {
          title: 'Broadcast',
          url: '/campaigns',
          icon: IconSpeakerphone,
        },
        {
          title: 'Signals',
          url: '/metric-library',
          icon: IconSignalE,
        },
        {
          title: 'Data Library',
          url: '/data-library',
          icon: IconDatabase,
        },
        {
          title: 'The Playbook',
          url: '/strategies',
          icon: IconChecklist,
        },
        {
          title: 'Threads',
          url: '/chats',
          icon: IconMessage,
        },
        {
          title: 'Help Desk',
          url: '/help-desk',
          icon: IconHeadphones,
        },
      ],
    },
  ],
}