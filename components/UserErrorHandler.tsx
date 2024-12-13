import { useUser } from '@/hooks/useUser'

import { FetchUserErrors } from '@/constants/errors'
import { showSnackbar } from '@/hooks/useSnackbar'
import { useEffect } from 'react'

export function UserErrorHandler() {
  const { fetchUserStatus } = useUser()

  useEffect(() => {
    if (fetchUserStatus !== 'loading' && fetchUserStatus !== 'success')
      showSnackbar({
        description: FetchUserErrors[fetchUserStatus]
      })
  }, [fetchUserStatus])

  return null
}
