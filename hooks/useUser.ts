import { useState } from 'react'

export function useUser() {
  const isOwl = false
  const authUser = {
    id: 'user_id_1',
    token: 'user_token'
  }

  const bunnyId = ''
  const bunnies = ['user_id_2', 'user_id_3'] // from database
  const areThereBunnies = bunnies.length > 0

  // const isLogged = authUser !== null && bunnyId !== ''
  const isLogged = true

  const fetchUserStatus = useState<FetchUserStatus>('success')[0]

  const setFirebaseCallback = (userId: string) => {
    // unsubscribe previous callback

    // set firebase callback
    //  - inside set fetchUserStatus to appropriate status

    return
  }

  const fetchUser = () => {
    // set fetchUserStatus to loading

    // try to get authUser (from persistent data)

    // if we fail to get authUser set fetchUserStatus to the correct error
    //    - no previous authUser in memory: first-time-user
    //    - problem with server while trying to authenticate: something
    //    - not found: registration-required

    // if bunny setBunnyId(authUser.id)
    // set fetchUserStatus to success

    // if isOwl, storedBunnyId != null, areThereBunnies == true => setBunnyId(storedBunnyId); set fetchUserStatus to success
    // else if !areThereBunnies => set the error no-bunnies
    // else set the error no-bunny

    // setFirebaseCallback(bunnyId)

    return
  }

  const login = async (): Promise<LoginStatus> => {
    // authentication

    // call fetchUser

    return 'success'
  }

  const logout = async (): Promise<LogoutStatus> => {
    // set bunnyId to null
    // unsubscribe firebase callback

    return 'success'
  }

  const setBunnyId = (bunnyId: string) => {
    // set bunnyId
    // unsubscribe previous firebase callback
    // set firebase callback
  }

  return {
    fetchUser,
    login,
    logout,
    setBunnyId,
    fetchUserStatus,
    isOwl,
    isLogged,
    bunnyId,
    areThereBunnies,
    bunnies,
    authUser
  }
}
