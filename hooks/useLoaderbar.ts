import { create } from 'zustand'

interface LoaderbarState {
  isVisible: boolean
  showLoaderbar: () => void
  hideLoaderbar: () => void
}

export const useLoaderbar = create<LoaderbarState>(set => ({
  isVisible: false,
  showLoaderbar: () => set({ isVisible: true }),
  hideLoaderbar: () => set({ isVisible: false })
}))

export const showLoaderbar = useLoaderbar.getState().showLoaderbar
