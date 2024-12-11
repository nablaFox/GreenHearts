import { TouchableOpacity } from 'react-native'
import { useState } from 'react'

import { GlowingHeartIcon } from '@/components/GlowingHeartIcon'

import { ScoreColorMap } from '@/constants/common'

export function HeartButton({
  score,
  constant,
  active,
  onPress
}: {
  score: HeartScore
  constant?: boolean
  active?: boolean
  onPress?: () => void
}) {
  const [isPressed, setIsPressed] = useState(active)

  const isButtonPressed = constant || isPressed
  const color = isButtonPressed ? ScoreColorMap[score] : 'gray'
  const glowFactor = isButtonPressed ? 1 : 0

  const handlePress = () => {
    if (constant) return

    setIsPressed(prev => !prev)
    onPress?.()
  }

  // active is used to force the button state to pressed

  // constant set the button pressed and without the ability to change it

  // render a button with a glowing heart icon

  // if button is pressed set the color to ScoreColorMap[score] and glowFactor to 1

  // if button is not pressed set the color to 'gray' and glowFactor to 0

  // in the future interpolate glowFactor to animate it

  return (
    <TouchableOpacity onPress={handlePress} disabled={constant}>
      <GlowingHeartIcon color={color} glowFactor={glowFactor} />
    </TouchableOpacity>
  )
}
