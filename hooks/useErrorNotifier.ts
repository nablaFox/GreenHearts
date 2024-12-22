import { useSnackBar } from '@/hooks/useSnackBar'
import { useEffect } from 'react'
import type { ActionStatus } from '@/types'

type OnlyError<T> = Exclude<T, 'success' | 'loading' | 'idle'>

type ErrorNotifierOptions<T extends string> = {
  origin: string
  customMessages?: Partial<Record<OnlyError<T>, string>>
  exclude?: OnlyError<T>[]
}

export function useErrorNotifier<T extends ActionStatus>(
  status: T,
  { origin, customMessages, exclude }: ErrorNotifierOptions<T>
): void {
  const addKnownError = useSnackBar(state => state.addKnownError)
  const addMessage = useSnackBar(state => state.addMessage)

  useEffect(() => {
    if (['success', 'loading', 'idle'].includes(status)) return

    if (exclude?.includes(status as OnlyError<T>)) return

    const customMessage = customMessages?.[status as OnlyError<T>]

    if (customMessage) {
      return addMessage({ description: customMessage, type: 'error' })
    }

    addKnownError({ description: status }, origin)
  }, [status, customMessages, origin, addKnownError, addMessage, exclude])
}
