import { useUsers } from '@/hooks/useUsers'

import { Loading } from './Loading'
import { Success } from './Success'
import { useErrorNotifier } from '@/hooks/useErrorNotifier'

export default function AddUserHandler() {
  const addUserStatus = useUsers(state => state.addUserStatus)

  useErrorNotifier(addUserStatus)

  if (addUserStatus === 'success') return <Success />

  if (addUserStatus === 'loading') return <Loading />

  return null
}
