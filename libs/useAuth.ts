import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

type LoginStatus = 'success' | 'no-id-token' | 'auth-error'

export function useAuth() {
  const initAuth = () => {
    GoogleSignin.configure({ webClientId: process.env.EXPO_WEB_CLIENT_ID })
  }

  const loginWithGoogle = async (): Promise<LoginStatus> => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

    const signInResult = await GoogleSignin.signIn()

    let idToken = signInResult.data?.idToken

    if (!idToken) {
      idToken = signInResult.data?.idToken
    }

    if (!idToken) {
      return 'no-id-token'
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    const res = await auth()
      .signInWithCredential(googleCredential)
      .catch(() => null)

    if (res === null) {
      return 'auth-error'
    }

    return 'success'
  }

  const logout = async (): Promise<LoginStatus> => {
    await auth().signOut()
    return 'success'
  }

  return {
    initAuth,
    loginWithGoogle,
    registerWithGoogle: loginWithGoogle,
    logout,
    authUser: auth().currentUser
  }
}
