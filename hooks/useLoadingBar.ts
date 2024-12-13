import { create } from 'zustand'

interface LoadingBarState {
  isVisible: boolean
  showLoadingBar: () => void
  hideLoadingBar: () => void
}

export const useLoadingBar = create<LoadingBarState>(set => ({
  isVisible: false,
  showLoadingBar: () => set({ isVisible: true }),
  hideLoadingBar: () => set({ isVisible: false })
}))

export const showLoadingBar = useLoadingBar.getState().showLoadingBar
