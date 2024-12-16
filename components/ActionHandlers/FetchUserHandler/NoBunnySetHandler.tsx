import { FlatList } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { useUser } from '@/hooks/useUser'
import { ThemedView } from '@/components/Themed'

// full screen
// provide a button to choose a bunny;
export function NoBunnySetHandler() {
  const { setBunnyId } = useUser()
  const bunnies = useUser(state => state.user?.bunnies ?? [])

  const onPress = (bunnyId: string) => {
    setBunnyId(bunnyId)
  }

  return (
    <ThemedView>
      <Text>Welcome back! Please choose a bunny to continue</Text>

      <FlatList
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
