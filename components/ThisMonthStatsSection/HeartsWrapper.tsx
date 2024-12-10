import { View, FlatList } from 'react-native'

import { HeartCard } from './HeartCard'
import { useStats } from '@/hooks/useStats'

export function HeartsWrapper() {
  const { todayStats } = useStats()
  const { greens, reds, blue, nc } = todayStats

  const data = [
    { title: 'Greens', score: greens, color: 'green' },
    { title: 'Reds', score: reds, color: 'red' },
    { title: 'Blue', score: blue, color: 'blue' },
    { title: 'Nc', score: nc, color: 'blue' }
  ]

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
