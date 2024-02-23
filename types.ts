// TODO: organize in folder
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
	total: number
}

export interface WeekStat {
	kcal?: number
	total?: number
	meals?: number
}

export interface User {
	admin?: boolean
	name: string, // TODO: handle undefined
	stats: Stats, // TODO: handle undefined
	weekly?: WeekStat[],
	admins?: string[],
	id: string
} 

export interface LocalUser {
	lastLogin: string
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

export interface Quote {
	head: string,
	body: string,
}
