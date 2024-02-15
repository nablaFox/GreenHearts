import { db } from '@/server/firebase'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	if (!body?.name)
		throw createError({
			statusCode: 400,
			name: 'Bad Request',
			statusMessage: 'Missing required fields',
		})

	const user = await db.collection('users').add({
		...body,
		stats: {
			green: 0,
			blue: 0,
			red: 0,
			total: 0
		}
	}).catch(() => {
		return null
	})

	if (user === null) 
		throw createError({
			statusCode: 500,
			name: 'Internal Server Error',
			statusMessage: 'Error creating user',
		})

	 return {
		id: user.id,
		...body
	 }
})
