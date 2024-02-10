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

export interface Post {
	id: string
	title?: string
	notes?: string
	green?: number
	blue?: number
	red?: number
	image?: string
	date?: string
}
