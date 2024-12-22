import { FlatList } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useShallow } from 'zustand/shallow'

import { ThemedView } from '@/components/Themed'

import { useUser } from '@/hooks/useUser'

export function NoBunnySet() {
  const setBunnyId = useUser(state => state.setBunnyId)
  const bunnies = useUser(useShallow(state => state.user?.bunnies ?? []))

  const onPress = (bunnyId: string) => {
    setBunnyId(bunnyId)
  }

  return (
    <ThemedView>
      <Text>Welcome back! Please choose a bunny to continue</Text>

      <FlatList
        keyExtractor={item => item}
        data={bunnies}
        renderItem={({ item }) => (
          <Button mode="outlined" onPress={() => onPress(item)}>
            {item}
          </Button>
        )}
      />
    </ThemedView>
  )
}
