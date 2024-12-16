import { create } from 'zustand'

interface ColorSchemeState {
  isDark: boolean
  toggleTheme: () => void
}

export const useColorScheme = create<ColorSchemeState>(set => ({
  isDark: false,
  toggleTheme: () => set(state => ({ isDark: !state.isDark }))
}))
