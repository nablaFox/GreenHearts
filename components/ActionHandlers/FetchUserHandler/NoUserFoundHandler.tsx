import { useState } from 'react'
import { View } from 'react-native'
import { Checkbox, Button } from 'react-native-paper'

import { useUser } from '@/hooks/useUser'

import { ThemedTextInput } from '@/components/Themed'

// full screen
// to show also if the user tries login without being registered
export function NoUserFoundHandler() {
  const { addUser } = useUser()

  const [username, setUsername] = useState('')
  const [isOwl, setIsOwl] = useState(false)

  const onAddUser = () => {
    addUser({ username, isOwl })
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
    </View>
  )
}
