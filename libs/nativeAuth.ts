import auth from '@react-native-firebase/auth'
import type { FirebaseAuthError } from './firebaseErrors'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

type LoginResult = 'ok' | FirebaseAuthError

export function initAuth() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID
  })

  if (__DEV__) {
    auth().useEmulator(
      `http://${process.env.EXPO_PUBLIC_AUTH_EMULATOR_HOST}:${process.env.EXPO_PUBLIC_AUTH_EMULATOR_PORT}`
    )
  }
}

export async function loginWithGoogle(): Promise<LoginResult> {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    const signInResult = await GoogleSignin.signIn()

    const idToken = signInResult.data?.idToken

    if (!idToken) throw 'auth/invalid-id-token'

    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    await auth().signInWithCredential(googleCredential)

    return 'ok'
  } catch (e: any) {
    return (e?.code || e) as FirebaseAuthError
  }
}

export async function removeAuthUser(): Promise<LoginResult> {
  const currentUser = auth().currentUser

  if (currentUser === null) return 'ok'

  return currentUser
    .delete()
    .catch(e => (e?.code || e) as FirebaseAuthError)
    .then(() => 'ok')
}

export async function logout(): Promise<LoginResult> {
  return auth()
    .signOut()
    .catch(e => (e?.code || e) as FirebaseAuthError)
    .then(() => 'ok')
}

export const getAuthUser = () => auth().currentUser

export const getAuthUserId = () => auth().currentUser?.uid
