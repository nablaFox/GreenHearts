import { create } from 'zustand'

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
  popMessage: () => void
}

export const useSnackBar = create<SnackBarState>(set => ({
  messages: [],
  addMessage: message =>
    set(state => ({ messages: [...state.messages, message] })),
  popMessage: () => set(state => ({ messages: state.messages.slice(1) }))
}))
