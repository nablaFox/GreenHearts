import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

type LoginResult = void | 'no-id-token' | 'auth-error'

export function useAuth() {
  const initAuth = () => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID
    })
  }

  const loginWithGoogle = async (): Promise<LoginResult> => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

    const signInResult = await GoogleSignin.signIn()

    const idToken = signInResult.data?.idToken

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
  }

  const logout = async (): Promise<LoginResult> => {
    await auth().signOut()
  }

  return {
    initAuth,
    loginWithGoogle,
    registerWithGoogle: loginWithGoogle,
    logout,
    authUser: auth().currentUser
  }
}
