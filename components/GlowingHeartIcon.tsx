import { Text } from 'react-native-paper'

export function GlowingHeartIcon({
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
