import { View } from 'react-native'

import ThisMonthStatsSection from '@/components/ThisMonthStatsSection'
import TodayStatsSection from '@/components/TodayStatsSection'
import ChartSection from '@/components/ChartSection'

export default function Index() {
  return (
    <View>
      <ThisMonthStatsSection />
      <TodayStatsSection />
      <ChartSection />
    </View>
  )
}
