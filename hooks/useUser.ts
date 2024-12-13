import { useState } from 'react'

export function useUser() {
  const isAdmin = false
  const isLogged = true

  const fetchUserStatus = useState<FetchUserStatus>('success')[0]

  const fetchUser = () => {}

  const login = async (): Promise<LoginStatus> => {
    return 'success'
  }

  return {
    fetchUser,
    login,
    fetchUserStatus,
    isAdmin,
    isLogged
  }
}
