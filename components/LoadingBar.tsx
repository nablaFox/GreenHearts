import { Text } from 'react-native-paper'

import { useLoadingBar } from '@/hooks/useLoadingBar'

export function LoadingBar() {
  const { isVisible } = useLoadingBar()

  if (!isVisible) return null

  return <Text>Loading...</Text>
}
