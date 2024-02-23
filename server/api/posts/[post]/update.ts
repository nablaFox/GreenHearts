import { db } from '@/server/firebase'
import { adminApp as admin } from '@/server/firebase'
import auth from '@/server/auth'
import type { VoteType, WeekStat } from '@/types'

// TODO: generalize this, and find better name
type ResultError = {
	statusCode: number,
	name: string,
	statusMessage: string,
}

type RequestResult = Promise<ResultError | null>

interface PostUpdate {
	voteType?: VoteType
	userId?: string
	updateValue?: string
}

function getVoteValue(vote: VoteType) {
	if (vote === 'green') return 1
	if (vote === 'red') return -2
	if (vote === 'blue') return .2

	return 0
}

function getUpdateNum(update: string): number | ResultError {
	const updateNum = parseInt(update)
	if (updateNum > 1 || updateNum < -1) {
		return {
			statusCode: 400,
			name: 'Bad Request',
			statusMessage: 'Invalid update value',
		}			
	}

	return updateNum
}

function checkVoteType(voteType: string): ResultError | null {
	if (
		voteType !== 'green' 
		&& voteType !== 'red' 
		&& voteType !== 'blue') {
		return {
			statusCode: 400,
			name: 'Bad Request',
			statusMessage: 'Invalid vote type',
		}			
	}

	return null
}

async function updatePostVote(
	userId: string, 
	postId: string, 
	voteType: VoteType, 
	update: number): RequestResult {
	if (
		voteType !== 'green' 
		&& voteType !== 'red' 
		&& voteType !== 'blue') {
		return {
			statusCode: 400,
			name: 'Bad Request',
			statusMessage: 'Invalid vote type',
		}			
	}	

	const res = await db.doc(`users/${userId}/posts/${postId}`).update({
		[voteType]: admin.firestore.FieldValue.increment(update),
	}).catch(() => false)


	if (res === false) 
		return {
			statusCode: 500,
			name: 'Internal Server Error',
			statusMessage: 'Error updating post vote',
		}

	return null
}

async function updateUserStats(userId: string, vote: VoteType, update: number) {
	const res = await db.doc(`users/${userId}`).update({
		[`stats.${vote}`]: admin.firestore.FieldValue.increment(update)
	}).catch(() => false)

	if (res === false) 
		return {
			statusCode: 500,
			name: 'Internal Server Error',
			statusMessage: 'Error updating user stats',
		}
}

async function updateWeekStats(userId: string, vote: VoteType, days?: WeekStat[]) {	
	const index = new Date().getDay()
	days = days || []

	const update = getVoteValue(vote)
	const lastTotal = days.at(-1)?.total || 0

	if (index > days.length) {
		for (let i = days.length; i < index - 1; i++)
			days.push({ total: lastTotal })

		days.push({ total: lastTotal + update })
	} else {
		days[index - 1] = {
			total: (days[index - 1].total || 0) + update
		}

		days = days.slice(0, index)
	}

	const res = await db.doc(`users/${userId}`).update({
		'weekly': days
	}).catch(() => false)
	
	if (res === false) 
		return {
			statusCode: 500,
			name: 'Internal Server Error',
			statusMessage: 'Error updating weekly stats',
		}
}

export default defineEventHandler(async (event) => {
	const user = await auth(event)

	if (!user?.admin) 
		throw createError({
			statusCode: 403,
			name: 'Forbidden',
			statusMessage: 'You can\'t perform this action',
		})

	const body = await readBody(event) as PostUpdate	

	const postId = getRouterParam(event, 'post')

	if (!body?.voteType || !body?.updateValue || !body?.userId || !postId)
		throw createError({
			statusCode: 400,
			name: 'Bad Request',
			statusMessage: 'Missing required fields',
		})

	const { voteType, updateValue, userId } = body

	const checkVote = checkVoteType(voteType)
	if (checkVote) throw createError(checkVote)

	// QUESTION: can I do it in a sinchrounous way?
	const update = getUpdateNum(updateValue)
	if (typeof update !== 'number') throw createError(update)

	const res = await updatePostVote(userId, postId, voteType, update)
	if (res) throw createError(res)

	const res1 = await updateUserStats(userId, voteType, update)
	if (res1) throw createError(res1)
	
	const res2 = await updateWeekStats(userId, voteType, user.weekly)
	if (res2) throw createError(res2)
})
