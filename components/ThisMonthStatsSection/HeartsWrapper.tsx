import { View, FlatList } from 'react-native'

import { HeartCard } from './HeartCard'
import { useStats } from '@/hooks/useStats'
import { useTheme } from '@/hooks/useTheme'

export function HeartsWrapper() {
  const { todayStats } = useStats()
  const { greens, reds, blue, grays } = todayStats
  const { theme } = useTheme()

  const data = [
    { title: 'Green', score: greens, color: theme.greenHeart },
    { title: 'Red', score: reds, color: theme.redHeart },
    { title: 'Blue', score: blue, color: theme.blueHeart },
    { title: 'Gray', score: grays, color: theme.grayHeart }
  ] as {
    title: string
    score: number
    color: string
  }[]

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <HeartCard {...item} />}
        keyExtractor={item => item.title}
        numColumns={2}
      />
    </View>
  )
}
