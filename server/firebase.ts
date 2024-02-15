import admin from 'firebase-admin'

admin.initializeApp({
	credential: admin.credential.cert(useRuntimeConfig().firebaseAdminCredentials),
})

export const db = admin.firestore()
export const auth = admin.auth()
export const storage = admin.storage()
export const adminApp = admin
