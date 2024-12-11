import { View } from 'react-native'

import ThisMonthStatsSection from '@/components/ThisMonthStatsSection'
import TodayStatsSection from '@/components/TodayStatsSection'
import ChartSection from '@/components/ChartSection'
import { HomeHeader } from '@/components/HomeHeader'

export default function Index() {
  return (
    <View>
      <HomeHeader />
      <ThisMonthStatsSection />
      <TodayStatsSection />
      <ChartSection />
    </View>
  )
}
