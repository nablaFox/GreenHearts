import React from 'react'
import { View } from 'react-native'

import { useStats } from '@/hooks/useStats'

import { StatsTitle } from './StatsTitle'
import { StatsDivider } from './StatsDivider'
import { EmojiCard } from './StatsCard/EmojiCard'
import { MealsCard } from './StatsCard/MealsCard'
import { KcalCard } from './StatsCard/KcalCard'

export default function TodayStatsSection() {
  const { todayStats } = useStats()
  const { score, kcal, meals } = todayStats

  return (
    <>
      <View>
        <StatsTitle />
        <StatsDivider />
      </View>

      <View>
        <EmojiCard score={score} />
        <MealsCard meals={meals} />
        <KcalCard kcal={kcal} />
      </View>
    </>
  )
}
