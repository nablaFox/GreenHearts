export type VoteType = 'green' | 'white' | 'red'

export type Vote = {
	score?: number
	type: VoteType
}

export type Stats = {
	green: number
	white: number
	red: number
}

export interface Post {
	id: string
	title?: string
	notes?: string
	green?: number
	white?: number
	red?: number
	image?: string
	date?: string
}
