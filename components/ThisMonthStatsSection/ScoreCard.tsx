import { Text } from 'react-native'

import { useStats } from '@/hooks/useStats'

export function ScoreCard() {
  const { thisMonthStats } = useStats()

  return <Text>Total score is {thisMonthStats.score} </Text>
}
