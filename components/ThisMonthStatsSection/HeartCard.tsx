import { View, Text } from 'react-native'

import { GlowingHeart } from '@/components/GlowingHeart'

export function HeartCard({
  title,
  score,
  color
}: {
  title: string
  score: number
  color: string
}) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{score}</Text>
      <GlowingHeart color={color} />
    </View>
  )
}
