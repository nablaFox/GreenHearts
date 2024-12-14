import { Text } from 'react-native-paper'

import { useStats } from '@/hooks/useStats'

export function MonthScoreCard() {
  const { thisMonthStats } = useStats()

  return <Text>The score of this month is {thisMonthStats.score} </Text>
}
