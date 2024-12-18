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

export function useErrorNotifier<T extends ActionStatus>(
  status: T,
  providedMessages?: Partial<Record<T, string>>
): void {
  const addMessage = useSnackBar(state => state.addMessage)
  const messageToUse =
    (providedMessages?.[status] ?? (defaultMessages as any)?.[status]) ||
    'unknown error'

  useEffect(() => {
    if (status === 'success' || status === 'loading' || status === 'idle')
      return

    addMessage({ description: messageToUse })
  }, [status, messageToUse, addMessage])
}
