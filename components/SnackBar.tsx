import { Text } from 'react-native-paper'

import { useSnackBar } from '@/hooks/useSnackBar'
import { useShallow } from 'zustand/shallow'
import { useEffect } from 'react'

export function SnackBar() {
  const messages = useSnackBar(useShallow(state => state.messages))
  const popMessage = useSnackBar(state => state.popMessage)

  useEffect(() => {
    if (messages.length === 0) return

    const timer = setTimeout(popMessage, 3000)

    return () => clearTimeout(timer)
  }, [messages, popMessage])

  if (messages.length === 0) return null

  return <Text>Snackbar message{messages[0].description}</Text>
}
