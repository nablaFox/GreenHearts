import { View } from 'react-native'

import { useStats } from '@/hooks/useStats'

import { EmojiCard, MealsCard, KcalCard } from './StatCards'

export function StatsWrapper() {
  const todayStats = useStats(state => state.todayStats)
  const { score, kcal, meals } = todayStats

  return (
    <View>
      <EmojiCard score={score} />
      <MealsCard meals={meals} />
      <KcalCard kcal={kcal} />
    </View>
  )
}
