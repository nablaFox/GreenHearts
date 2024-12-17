import { TouchableOpacity } from 'react-native'

import { GlowingHeart } from '@/components/GlowingHeart'
import { useTheme } from '@/hooks/useTheme'
import { Heart } from '@/types'

export function HeartButton({
  heart,
  disabled,
  onPress
}: {
  heart: Heart
  disabled?: boolean
  onPress?: () => void
}) {
  const { theme } = useTheme()

  const scoreColorMap: Record<Heart, string> = {
    0: theme.grayHeart,
    0.25: theme.blueHeart,
    1: theme.greenHeart,
    '-1': theme.redHeart
  }

  const color = scoreColorMap[heart]
  const glowFactor = heart !== Heart.Gray ? 1 : 0

  const handlePress = () => {
    if (disabled) return
    onPress?.()
  }

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <GlowingHeart color={color} glowFactor={glowFactor} />
    </TouchableOpacity>
  )
}
