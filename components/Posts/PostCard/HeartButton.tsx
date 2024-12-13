import { TouchableOpacity } from 'react-native'

import { GlowingHeartIcon } from '@/components/GlowingHeartIcon'

import { ScoreColorMap } from '@/constants/scores'

export function HeartButton({
  score,
  disabled,
  onPress
}: {
  score: HeartScore
  disabled?: boolean
  onPress?: () => void
}) {
  const color = ScoreColorMap[score]
  const glowFactor = score !== 0 ? 1 : 0

  const handlePress = () => {
    if (disabled) return
    onPress?.()
  }

  return (
    <TouchableOpacity onPress={handlePress} disabled>
      <GlowingHeartIcon color={color} glowFactor={glowFactor} />
    </TouchableOpacity>
  )
}
