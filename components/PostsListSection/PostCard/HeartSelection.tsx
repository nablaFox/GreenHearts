import { View } from 'react-native'

import { HeartButton } from './HeartButton'
import { Heart } from '@/types'

export function HeartSelection({
  assignableHearts,
  activeHeart,
  onSelectedHeart,
  onDeSelectedHeart
}: {
  assignableHearts: Heart[]
  activeHeart: Heart
  onSelectedHeart?: (heart: Heart) => void
  onDeSelectedHeart?: (heart: Heart) => void
}) {
  const onPress = (heart: Heart) => {
    if (activeHeart !== Heart.Gray) onDeSelectedHeart?.(activeHeart)

    if (activeHeart !== heart) onSelectedHeart?.(heart)
  }

  return (
    <View>
      {assignableHearts.map(heart => (
        <HeartButton
          key={heart}
          heart={activeHeart === heart ? activeHeart : Heart.Gray}
          onPress={() => onPress(heart)}
        />
      ))}
    </View>
  )
}
