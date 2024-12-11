import { View } from 'react-native'

import { useStats } from '@/hooks/useStats'

import { EmojiCard } from './StatsCard/EmojiCard'
import { MealsCard } from './StatsCard/MealsCard'
import { KcalCard } from './StatsCard/KcalCard'

export function StatsWrapper() {
  const { todayStats } = useStats()
  const { score, kcal, meals } = todayStats

  return (
    <View>
      <EmojiCard score={score} />
      <MealsCard meals={meals} />
      <KcalCard kcal={kcal} />
    </View>
  )
}
