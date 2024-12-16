import { BunniesHeader } from '@/components/Headers/BunniesHeader'
import { ThemedView } from '@/components/Themed'
import { useUser } from '@/hooks/useUser'
import { FlatList } from 'react-native'
import { Button } from 'react-native-paper'

export default function Bunnies() {
  const { setBunnyId } = useUser()
  const bunnies = useUser(state => state.user?.bunnies ?? [])

  const onPress = (bunnyId: string) => {
    setBunnyId(bunnyId)
  }

  return (
    <ThemedView>
      <BunniesHeader />

      <FlatList
        data={bunnies}
        renderItem={({ item }) => (
          <Button onPress={() => onPress(item)}>{item}</Button>
        )}
      />
    </ThemedView>
  )
}
