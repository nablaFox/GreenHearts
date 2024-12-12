export function useUser() {
  const isAdmin = false
  const isLogged = true

  const fetchUserStatus: APIStatus = 'success'

  const fetchUser = () => {}

  return {
    fetchUser,
    fetchUserStatus,
    isAdmin,
    isLogged
  }
}
