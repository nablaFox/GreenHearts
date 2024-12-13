import { Text } from 'react-native-paper'

import { useSnackBar } from '@/hooks/useSnackBar'

export function SnackBar() {
  const { message, isVisible } = useSnackBar()

  if (!isVisible) return null

  return <Text>Snackbar message {message.description}</Text>
}
