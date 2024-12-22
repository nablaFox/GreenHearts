import { useSnackBar } from '@/hooks/useSnackBar'
import { useEffect } from 'react'
import { t } from '@lingui/core/macro'
import type { ActionStatus } from '@/types'
import type {
  FirestoreError,
  FirebaseAuthError,
  FirebaseStorageError
} from '@/api'

type FirebaseErrors = FirestoreError | FirebaseAuthError | FirebaseStorageError

const defaultMessages: Partial<Record<FirebaseErrors, string>> = {
  'firestore/permission-denied': t`You don't have permission to do this action`
}

type OnlyError<T> = Exclude<T, 'success' | 'loading' | 'idle'>

export function useErrorNotifier<T extends ActionStatus>(
  status: T,
  providedMessages?: Partial<Record<OnlyError<T>, string>>
): void {
  const addMessage = useSnackBar(state => state.addMessage)
  const messageToUse =
    providedMessages?.[status] ?? (defaultMessages as any)?.[status]

  useEffect(() => {
    if (status === 'success' || status === 'loading' || status === 'idle')
      return

    if (!messageToUse) return

    addMessage({ description: messageToUse })
  }, [status, messageToUse, addMessage])
}
