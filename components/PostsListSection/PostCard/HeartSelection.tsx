import { View } from 'react-native'

import { HeartButton } from './HeartButton'
import { Heart } from '@/types'

export function HeartSelection({
  assignableHearts,
  activeHeart,
  onSelectedHeart
}: {
  assignableHearts: Heart[]
  activeHeart: Heart
  onSelectedHeart?: (heart: Heart) => void
}) {
  return (
    <View>
      {assignableHearts.map(heart => (
        <HeartButton
          key={heart}
          heart={activeHeart === heart ? activeHeart : Heart.Gray}
          onPress={() => onSelectedHeart?.(heart)}
        />
      ))}
    </View>
  )
}
