import { Timestamp } from 'firebase-admin/firestore'
import type { Post } from '@/types'
import auth from '~/server/auth'
import { adminApp, db } from '~/server/firebase'

export default defineEventHandler(async (event) => {
	const user = await auth(event)
	const body = await readBody(event)
	const post = {} as Post

	if (!body?.title && !body?.image) 
		throw createError({
			statusCode: 400,
			name: 'Bad Request',
			statusMessage: 'Post must have a title or an image'
		})

	post.date = (Timestamp.now().toDate()) as any
	if (body?.title) post.title = body.title
	if (body?.notes) post.notes = body.notes
	if (body?.image) post.image = body.image

	const res = await db.collection(`users/${user.id}/posts`).add(post)
		.catch(() => false) 

	if (res === false) 
		throw createError({
			statusCode: 500,
			name: 'Internal Server Error',
			statusMessage: 'Error creating post'
		})

	const res1 = await db.doc(`users/${user.id}`).update({
		['stats.total']: adminApp.firestore.FieldValue.increment(1),
	}).catch(() => false)

	// TODO: update weekly stats

	if (res1 === false) 
		throw createError({
			statusCode: 500,
			name: 'Internal Server Error',
			statusMessage: 'Error updating user stats'
		})
})
