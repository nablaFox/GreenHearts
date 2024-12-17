import { useUsers } from '@/hooks/useUsers'

import { Loading } from './Loading'
import { Success } from './Success'

export default function AddUserHandler() {
  const addUserStatus = useUsers(state => state.addUserStatus)

  if (addUserStatus === 'success') return <Success />

  if (addUserStatus === 'loading') return <Loading />

  // generic error handling
  return null
}

