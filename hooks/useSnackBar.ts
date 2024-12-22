import { create } from 'zustand'
import { t } from '@lingui/core/macro'

import type {
  FirestoreError,
  FirebaseAuthError,
  FirebaseStorageError
} from '@/api'

type FirebaseErrors = FirestoreError | FirebaseAuthError | FirebaseStorageError

type SnackBarType = 'error' | 'success' | 'warning'

interface SnackbarMessage {
  title?: string
  description: string
  icon?: string
  timeout?: number
  type?: SnackBarType
}

interface SnackBarState {
  messages: SnackbarMessage[]
  addMessage: (message: SnackbarMessage) => void
  addKnownError: (error: Omit<SnackbarMessage, 'type'>, origin?: string) => void
  popMessage: () => void
}

const defaultMessages: Partial<Record<FirebaseErrors, string>> = {
  'firestore/permission-denied': t`You don't have permission to do this action`,
  'firestore/not-found': t`The requested resource was not found`
}

export const useSnackBar = create<SnackBarState>((set, get) => ({
  messages: [],
  addMessage: message =>
    set(state => ({ messages: [...state.messages, message] })),

  addKnownError: (error, origin) => {
    const messageDescription =
      defaultMessages[error.description as FirebaseErrors] ||
      t`An error occured`

    const message: SnackbarMessage = {
      ...error,
      type: 'error',
      description: `${messageDescription} ${origin || ''}`
    }

    get().addMessage(message)
  },

  popMessage: () => set(state => ({ messages: state.messages.slice(1) }))
}))
