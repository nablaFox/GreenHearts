import { collection, query, limit, orderBy, addDoc, updateDoc, increment, doc } from 'firebase/firestore'
import type { Post, Vote } from '@/types'

const fakePosts: Post[] = [
	{
		id: '1',
		title: 'Post 1',
		notes: 'This is the first post',
		green: 1,
		white: 1,
		image: '/test.png',
		date: '2021-10-01'
	},
	{
		id: '2',
		title: 'Post 2',
		notes: 'This is the second post',
		red: 1,
		image: 'https://placekitten.com/200/300',
		date: '2021-10-02'
	},
	{
		id: '3',
		title: 'Post 3',
		notes: 'This is the third post',
		green: 1,
		image: 'https://placekitten.com/200/300',
		date: '2021-10-03'
	}
]

export function usePost() {	
	const db = useFirestore()
	const lim = ref(10)	
	const _query = computed(() => query(collection(db, 'posts'), orderBy('date', 'desc'), limit(lim.value)))
	const posts = useCollection<Post>(_query)
	// const posts = ref(fakePosts)

	function getMorePosts() {
		lim.value += 10
	}

	async function createPost(data: Post) {
		return addDoc(collection(useFirestore(), 'posts'), data)
	}

	async function votePost(id: string, vote: Vote, negative: boolean) {
		const _score = vote.score || 1	
		const update = negative ? -_score : _score

		await updateDoc(doc(db, 'posts', id), {
			[vote.type]: increment(update)
		})

		await updateDoc(doc(db, 'stats', 'base'), {
			[vote.type]: increment(update)
		})
	}

	return {
		posts,
		createPost,
		votePost,
		getMorePosts
	}
}
