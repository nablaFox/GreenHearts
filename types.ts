export type VoteType = 'green' | 'white' | 'red'

export type Vote = {
	score?: number
	type: VoteType
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
