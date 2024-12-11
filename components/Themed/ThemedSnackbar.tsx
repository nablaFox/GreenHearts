import { Text } from 'react-native-paper'

import { useSnackbar } from '@/hooks/useSnackbar'

export function ThemedSnackbar() {
  const { message, isVisible } = useSnackbar()

  if (!isVisible) return null

  return <Text>Hello from snackbar {message.description}</Text>
}
