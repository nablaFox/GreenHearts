import { useEffect } from 'react'
import { Text } from 'react-native-paper'

export function SplashScreen({
  onAnimationEnd
}: {
  onAnimationEnd: () => void
}) {
  useEffect(() => {
    const timeoutId = setTimeout(onAnimationEnd, 1000)

    return () => clearTimeout(timeoutId)
  }, [onAnimationEnd])

  return <Text>Loading app...</Text>
}
