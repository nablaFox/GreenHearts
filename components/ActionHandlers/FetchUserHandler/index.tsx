import { useUser } from '@/hooks/useUser'
import { useErrorNotifier } from '@/hooks/useErrorNotifier'

import { Loading } from './Loading'
import { UserNotFound } from './UserNotFound'

export default function FetchUserHandler() {
  const fetchUserStatus = useUser(state => state.fetchUserStatus)

  useErrorNotifier(fetchUserStatus)

  if (fetchUserStatus === 'loading') return <Loading />

  if (fetchUserStatus === 'firestore/not-found') return <UserNotFound />

  return null
}
