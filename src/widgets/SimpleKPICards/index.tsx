import CategorizeIcon from '@/assets/ShadowIconsReact/Categorize'
import DataSheetIcon from '@/assets/ShadowIconsReact/DataSheet'
import GroupIcon from '@/assets/ShadowIconsReact/Group'
import AddTicketIcon from '@/assets/ShadowIconsReact/AddTicket'

import SocialProof from '@/components/shadcn-studio/blocks/social-proof-07/social-proof-07'

const metricsData = [
  {
    icon: CategorizeIcon,
    value: '110+',
    label: 'BLOCKS'
  },
  {
    icon: DataSheetIcon,
    value: '29',
    label: 'TEMPLATE'
  },
  {
    icon: GroupIcon,
    value: '3400',
    label: 'CUSTOMERS'
  },
  {
    icon: AddTicketIcon,
    value: '2844+',
    label: 'SUPPORT TICKET'
  }
]

const SocialProofPage = () => {
  return <SocialProof metrics={metricsData} />
}

export default SocialProofPage
