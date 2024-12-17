import { ThemedView } from '@/components/Themed'
import { Text, Switch, Button } from 'react-native-paper'

import { SettingsHeader } from '@/components/Headers/SettingsHeader'
import { useColorScheme } from '@/libs/useColorScheme'
import { logout } from '@/libs/nativeAuth'
import { useUser } from '@/hooks/useUser'

export default function Settings() {
  const { isDark, toggleTheme } = useColorScheme()
  const { reset } = useUser()

  const onLogout = async () => {
    await logout()
    reset()
  }

  return (
    <ThemedView>
      <SettingsHeader />
      <Text>Settings</Text>

      <Switch value={isDark} onValueChange={toggleTheme} />
      <Button onPress={onLogout}>Logout</Button>
    </ThemedView>
  )
}
