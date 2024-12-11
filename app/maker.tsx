import { ThemedView } from '@/components/ThemedView'
import { Text } from 'react-native-paper'

import { MakerHeader } from '@/components/Headers/MakerHeader'

export default function Maker() {
  return (
    <ThemedView className="flex-1">
      <MakerHeader />
      <Text>Maker</Text>
    </ThemedView>
  )
}
