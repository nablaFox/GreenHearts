import { Text } from 'react-native-paper'

export function GlowingHeart({
  color,
  size,
  glowFactor
}: {
  color: HeartColor
  size?: number
  glowFactor?: number
}) {
  return <Text>💖</Text>
}
