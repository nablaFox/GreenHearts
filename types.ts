import type { Timestamp } from 'firebase/firestore'

export type VoteType = 'green' | 'blue' | 'red'

export type Vote = {
	score?: number
	type: VoteType
}

export type Stats = {
	green: number
	blue: number
	red: number
}

export interface User {
	stats: Stats,
	admins: string[],
} 

export interface Post {
	id: string
	title?: string
	notes?: string
	green?: number
	blue?: number
	red?: number
	image?: string
	date?: Timestamp
}

export interface FetchPostsOptions {
	lim: number
}

export type CreatePostParams = {
	title: string | undefined
	notes: string | undefined
	image: File | null
}
