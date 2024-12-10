import { View } from 'react-native'

import { HeartsWrapper } from './HeartsWrapper'
import { ScoreCard } from './ScoreCard'

export default function HeartsScoresSection() {
  return (
    <View>
      <HeartsWrapper />
      <ScoreCard />
    </View>
  )
}
