import { ThemedView } from '@/components/Themed'

import ThisMonthStatsSection from '@/components/ThisMonthStatsSection'
import TodayStatsSection from '@/components/TodayStatsSection'
import ChartSection from '@/components/ChartSection'
import { HomeHeader } from '@/components/Headers/HomeHeader'

export default function Index() {
  return (
    <ThemedView>
      <HomeHeader />
      <ThisMonthStatsSection />
      <TodayStatsSection />
      <ChartSection />
    </ThemedView>
  )
}
