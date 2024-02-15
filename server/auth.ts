import type { H3Event, EventHandlerRequest } from 'h3'
import type { User } from '~/types'
import { DecodedIdToken, getAuth } from 'firebase-admin/auth'
import { db } from './firebase'

export default async (event: H3Event<EventHandlerRequest>) => {		
	const token = event.headers.get('Authorization')
	
	const error = createError({
		statusCode: 401,
		name: 'Unauthorized',
		statusMessage: 'User not authorized'
	})
	
	if (!token)
		throw error	

	const res = await getAuth().verifyIdToken(token).catch(() => {
		return false
	})

	if (res === false)
		throw error

	const { uid } = res as DecodedIdToken
	
	const userDoc = await db.collection('users').doc(uid).get()

	if (!userDoc.exists)
		throw error

	return {
		...userDoc.data() as User,
		id: uid,
	}
}
