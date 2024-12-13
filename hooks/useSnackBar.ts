import { create } from 'zustand'

interface SnackbarMessage {
  title?: string
  description: string
  icon?: string
  timeout?: number
}

interface SnackBarState {
  message: SnackbarMessage
  isVisible: boolean
  showSnackBar: (message: SnackbarMessage) => void
  hideSnackBar: () => void
}

export const useSnackBar = create<SnackBarState>(set => ({
  message: { description: '' },
  isVisible: false,
  showSnackBar: (message: SnackbarMessage) => set({ message, isVisible: true }),
  hideSnackBar: () => set({ isVisible: false })
}))

export const showSnackBar = useSnackBar.getState().showSnackBar
