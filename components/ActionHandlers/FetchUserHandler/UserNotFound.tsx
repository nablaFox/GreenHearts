import { useState } from 'react'
import { View } from 'react-native'
import { Checkbox, Button } from 'react-native-paper'

import { ThemedTextInput } from '@/components/Themed'
import { removeAuthUser } from '@/libs/nativeAuth'
import { useUsers } from '@/hooks/useUsers'
import { useUser } from '@/hooks/useUser'

// full screen
// to show also if the user tries login without being registered
export function UserNotFound() {
  const addUser = useUsers(state => state.addUser)
  const fetchUser = useUser(state => state.fetchUser)

  const [username, setUsername] = useState('')
  const [isOwl, setIsOwl] = useState(false)

  const onAddUser = () => {
    addUser({ username, isOwl })
    fetchUser()
  }

  return (
    <View>
      <ThemedTextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Checkbox
        status={isOwl ? 'checked' : 'unchecked'}
        onPress={() => setIsOwl(!isOwl)}
      />

      <Button onPress={onAddUser}>Get on board!</Button>

      <Button onPress={removeAuthUser}>Cancel registration</Button>
    </View>
  )
}
