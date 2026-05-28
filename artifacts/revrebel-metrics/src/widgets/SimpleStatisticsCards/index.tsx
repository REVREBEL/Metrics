import InTransitIcon from '@/assets/ShadowIconsReact/InTransit'
import BrokenBottleIcon from '@/assets/ShadowIconsReact/BrokenBottle'
import CalendarIcon from '@/assets/ShadowIconsReact/CalendarPlus'
import AlarmClockIcon from '@/assets/ShadowIconsReact/AlarmClock'

import StatisticsCard from '@/components/shadcn-studio/blocks/statistics-card-01'

// Statistics card data
const StatisticsCardData = [
  {
    icon: <InTransitIcon className='size-4' />,
    value: '42',
    title: 'Shipped Orders',
    changePercentage: '+18.2%'
  },
  {
    icon: <BrokenBottleIcon className='size-4' />,
    value: '8',
    title: 'Damaged Returns',
    changePercentage: '-8.7%'
  },
  {
    icon: <CalendarIcon className='size-4' />,
    value: '27',
    title: 'Missed Delivery Slots',
    changePercentage: '+4.3%'
  },
  {
    icon: <AlarmClockIcon className='size-4' />,
    value: '13',
    title: 'Late Deliveries',
    changePercentage: '-2.5%'
  }
]

const StatisticsCardPreview = () => {
  return (
    <div className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8'>
        {StatisticsCardData.map((card, index) => (
          <StatisticsCard
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
            changePercentage={card.changePercentage}
          />
        ))}
      </div>
    </div>
  )
}

export default StatisticsCardPreview
