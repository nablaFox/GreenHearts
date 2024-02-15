import { db } from '@/server/firebase'
import { adminApp as admin } from '@/server/firebase'
import auth from '@/server/auth'
import type { VoteType } from '@/types'

export default defineEventHandler(async (event) => {
	const user = await auth(event)

	if (!user?.admin) 
		throw createError({
			statusCode: 403,
			name: 'Forbidden',
			statusMessage: 'You can\'t perform this action',
		})

	const body = await readBody(event) as {
		voteType?: VoteType,
		updateValue?: string,
		userId?: string,
	}	

	const postId = getRouterParam(event, 'post')

	if (!body?.voteType || !body?.updateValue || !body?.userId)
		throw createError({
			statusCode: 400,
			name: 'Bad Request',
			statusMessage: 'Missing required fields',
		})

	const { voteType, updateValue, userId } = body

	if (
		voteType !== 'green' 
		&& voteType !== 'red' 
		&& voteType !== 'blue')
		throw createError({
			statusCode: 400,
			name: 'Bad Request',
			statusMessage: 'Invalid vote type',
		})

	const updateNum = parseInt(updateValue)

	if (updateNum > 1 || updateNum < -1)
		throw createError({
			statusCode: 400,
			name: 'Bad Request',
			statusMessage: 'Invalid update value',
		})

	const res = await db.doc(`users/${userId}/posts/${postId}`).update({
		[voteType]: admin.firestore.FieldValue.increment(updateNum)
	}).catch(() => {
		return false
	})

	if (res === false) 
		throw createError({
			statusCode: 500,
			name: 'Internal Server Error',
			statusMessage: 'Error updating post vote',
		})

	const res1 = await db.doc(`users/${userId}`).update({
		[`stats.${voteType}`]: admin.firestore.FieldValue.increment(updateNum)
	}).catch(() => {
		return false
	})

	if (res1 === false) 
		throw createError({
			statusCode: 500,
			name: 'Internal Server Error',
			statusMessage: 'Error updating user stats',
		})
})
