import {
  MD3LightTheme as DefaultLightTheme,
  MD3DarkTheme as DefaultDarkTheme
} from 'react-native-paper'
import colors from '@/theme.json'

import { useColorScheme } from '@/libs/useColorScheme'

export function useTheme() {
  const { isDark } = useColorScheme()

  const lightTheme = {
    ...DefaultLightTheme,
    greenHeart: 'green',
    redHeart: 'red',
    blueHeart: 'blue',
    grayHeart: 'gray',
    colors: {
      ...DefaultLightTheme.colors,
      ...colors.light
    }
  }

  const darkTheme = {
    ...DefaultDarkTheme,
    greenHeart: 'green',
    redHeart: 'red',
    blueHeart: 'blue',
    grayHeart: 'gray',
    colors: {
      ...DefaultDarkTheme.colors,
      ...colors.dark
    }
  }

  const theme = isDark ? darkTheme : lightTheme

  return {
    lightTheme,
    darkTheme,
    theme
  }
}
