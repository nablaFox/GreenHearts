import { Text } from 'react-native-paper'
import { CollapsibleHeader } from './CollapsibleHeader'
import { Link } from 'expo-router'
import { View } from 'react-native'

import { useUser } from '@/hooks/useUser'

export function HomeHeader() {
  const user = useUser(state => state.user)
  const bunny = useUser(state => state.bunny)

  return (
    <CollapsibleHeader>
      <Text>Home Header</Text>
      <View className="flex-row gap-4">
        <Text>User: {user?.username}</Text>
        <Text>Bunny: {bunny?.username}</Text>
      </View>

      <Link href="/settings">settings link</Link>
    </CollapsibleHeader>
  )
}
