import { create } from 'zustand'

interface SnackbarMessage {
  title?: string
  description: string
  icon?: string
  timeout?: number
}

interface SnackbarState {
  message: SnackbarMessage
  isVisible: boolean
  showSnackbar: (message: SnackbarMessage) => void
  hideSnackbar: () => void
}

export const useSnackbar = create<SnackbarState>(set => ({
  message: { description: '' },
  isVisible: false,
  showSnackbar: (message: SnackbarMessage) => set({ message, isVisible: true }),
  hideSnackbar: () => set({ isVisible: false })
}))

export const showSnackbar = useSnackbar.getState().showSnackbar
