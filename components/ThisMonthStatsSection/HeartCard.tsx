import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { GlowingHeart } from '@/components/GlowingHeart'

export function HeartCard({
  title,
  score,
  color
}: {
  title: string
  score: number
  color: HeartColor
}) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{score}</Text>
      <GlowingHeart color={color} />
    </View>
  )
}
