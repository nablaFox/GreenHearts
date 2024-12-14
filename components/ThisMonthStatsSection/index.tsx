import { View } from 'react-native'

import { HeartsWrapper } from './HeartsWrapper'
import { MonthScoreCard } from './MonthScoreCard'

export default function HeartsScoresSection() {
  return (
    <View>
      <HeartsWrapper />
      <MonthScoreCard />
    </View>
  )
}
