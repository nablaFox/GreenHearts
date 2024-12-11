import { ThemedView } from '@/components/ThemedView'
import { Text } from 'react-native-paper'

import { SettingsHeader } from '@/components/Headers/SettingsHeader'

export default function Settings() {
  return (
    <ThemedView>
      <SettingsHeader />
      <Text>Settings</Text>
    </ThemedView>
  )
}
