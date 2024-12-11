import React from 'react'
import { View } from 'react-native'

import { StatsTitle } from './StatsTitle'
import { StatsDivider } from './StatsDivider'
import { StatsWrapper } from './StatsWrapper'

export default function TodayStatsSection() {
  return (
    <>
      <View>
        <StatsTitle />
        <StatsDivider />
      </View>

      <StatsWrapper />
    </>
  )
}
