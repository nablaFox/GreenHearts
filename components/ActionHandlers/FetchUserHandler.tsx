import { useUser } from '@/hooks/useUser'
import { showSnackBar } from '@/hooks/useSnackBar'

import { FetchUserErrors } from '@/constants/errors'

import { ActionHandler } from './ActionHandler'
import { LoadingUserSplash } from '@/components/LoadingSplashScreens'

export default function FetchUserHandler() {
  const { fetchUserStatus } = useUser()

  const onError = (error: FetchUserError) => {
    showSnackBar({ description: FetchUserErrors[error] })
    return null
  }

  return (
    <ActionHandler
      actionStatus={fetchUserStatus}
      onError={onError}
      onLoading={() => <LoadingUserSplash />}
    />
  )
}
