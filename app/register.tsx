import { useState } from 'react'
import { View } from 'react-native'
import { Checkbox, Button } from 'react-native-paper'

import { ThemedTextInput } from '@/components/Themed'
import { AddUserLoading, AddUserSuccess } from '@/components/ActionHandlers'
import { removeAuthUser } from '@/libs/nativeAuth'
import { useUsers } from '@/hooks/useUsers'
import { useUser } from '@/hooks/useUser'
import { useErrorNotifier } from '@/hooks/useErrorNotifier'
import { t } from '@lingui/core/macro'

export default function Register() {
  const addUser = useUsers(state => state.addUser)
  const resetUser = useUser(state => state.reset)

  const addUserStatus = useUsers(state => state.addUserStatus)
  const [username, setUsername] = useState('')
  const [isOwl, setIsOwl] = useState(false)

  const onAddUser = () => {
    addUser({ username, isOwl })
  }

  const onCancelRegistration = async () => {
    await removeAuthUser()
    resetUser()
  }

  useErrorNotifier(addUserStatus, { origin: t`registering user` })

  if (addUserStatus === 'success') return <AddUserSuccess />

  if (addUserStatus === 'loading') return <AddUserLoading />

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

      <Button onPress={onCancelRegistration}>Cancel registration</Button>
    </View>
  )
}

