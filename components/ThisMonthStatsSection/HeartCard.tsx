import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { GlowingHeartIcon } from '@/components/GlowingHeartIcon'

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
      <GlowingHeartIcon color={color} />
    </View>
  )
}
