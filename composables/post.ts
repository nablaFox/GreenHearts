import { collection, query, limit, orderBy, addDoc, updateDoc, increment, doc, Timestamp } from 'firebase/firestore'
import type { Post, Vote } from '@/types'

export function usePost() {
	const db = useFirestore()
	const lim = ref(10)
	const _query = computed(() => query(collection(db, 'posts'), orderBy('date', 'desc'), limit(lim.value)))
	const posts = useCollection<Post>(_query)
	const {upload, url} = usePostStorage()

	function getMorePosts() {
		lim.value += 10
	}

	type CreatePostParams = {
		title: string | undefined
		notes: string | undefined
		image: File | null
	}

	async function createPost({title, notes, image}: CreatePostParams) {
		if (!title && !image) return

		const params = {
			title,
			notes,
			image: null as string | null,
			date: Timestamp.now()
		}

		if (image) {
			await upload(image)
			params.image = url.value as string
		}

		await addDoc(collection(useFirestore(), 'posts'), params)
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
