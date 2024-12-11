import { Text } from 'react-native-paper'

import { useLoaderbar } from '@/hooks/useLoaderbar'

export function Loaderbar() {
  const { isVisible } = useLoaderbar()

  if (!isVisible) return null

  return <Text>Loading...</Text>
}
