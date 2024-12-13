import { useUser } from '@/hooks/useUser'

import { FetchUserErrors } from '@/constants/errors'
import { showSnackbar } from '@/hooks/useSnackbar'

export function UserErrorHandler() {
  const { fetchUserStatus } = useUser()

  if (fetchUserStatus === 'loading' || fetchUserStatus === 'success')
    return null

  showSnackbar({
    description: FetchUserErrors[fetchUserStatus]
  })

  return null
}
