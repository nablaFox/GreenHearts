import { ThemedView } from '@/components/Themed'
import { Text, Switch } from 'react-native-paper'

import { SettingsHeader } from '@/components/Headers/SettingsHeader'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function Settings() {
  const { isDark, toggleTheme } = useColorScheme()

  return (
    <ThemedView>
      <SettingsHeader />
      <Text>Settings</Text>

      <Switch value={isDark} onValueChange={toggleTheme} />
    </ThemedView>
  )
}
