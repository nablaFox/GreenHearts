import { useUser } from '@/hooks/useUser'
import { showSnackBar } from '@/hooks/useSnackBar'

import { FetchUserErrors } from '@/constants/errors'

import { ActionHandler } from './ActionHandler'
import { LoadingUserSplash } from '@/components/LoadingSplashScreens'

import { ChooseBunnyAtLogin } from '@/components/Owls/ChooseBunnyAtLogin'
import { NoBunnies } from '@/components/Owls/NoBunnies'

export default function FetchUserHandler() {
  const { fetchUserStatus } = useUser()

  const onError = (error: FetchUserError) => {
    switch (error) {
      case 'first-time-user':
        return null
      case 'no-bunny':
        return <ChooseBunnyAtLogin />
      case 'no-bunnies':
        return <NoBunnies />
      default:
        showSnackBar({ description: FetchUserErrors[error] })
        return null
    }
  }

  return (
    <ActionHandler
      actionStatus={fetchUserStatus}
      onError={onError}
      onLoading={() => <LoadingUserSplash />}
    />
  )
}
