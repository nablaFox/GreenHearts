import auth from '@react-native-firebase/auth'
import type { FirebaseAuthError } from './firebaseErrors'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

type LoginResult = 'ok' | FirebaseAuthError

export function initAuth() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID
  })
}

export async function loginWithGoogle(): Promise<LoginResult> {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

  const signInResult = await GoogleSignin.signIn().catch(() => null)

  const idToken = signInResult?.data?.idToken

  if (!idToken) {
    return 'auth/invalid-id-token'
  }

  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  return auth()
    .signInWithCredential(googleCredential)
    .then(() => undefined)
    .catch(e => e)
}

export async function removeAuthUser(): Promise<LoginResult> {
  const currentUser = auth().currentUser

  if (currentUser === null) return 'ok'

  return currentUser
    .delete()
    .catch(e => e)
    .then(() => 'ok')
}

export async function logout(): Promise<LoginResult> {
  return auth()
    .signOut()
    .catch(e => e)
    .then(() => 'ok')
}

export const authUser = auth().currentUser

export const authUserId = auth().currentUser?.uid
