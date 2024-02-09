import { collection, query, limit, orderBy, addDoc, updateDoc, increment, doc, getCountFromServer } from 'firebase/firestore'
import type { Post, Vote } from '@/types'

export function usePosts() {
	const db = useFirestore()
	const coll = collection(db, 'posts')
	const lim = useState<number>('postsLimit')
	const total = useState<number>('postsTotal')
	const posts = useState<Post[]>('posts')
	const fetched = useState<boolean>('postsFetched')
	const length = computed(() => posts.value?.length)
	const _query = computed(() => query(coll, orderBy('date', 'desc'), limit(lim.value)))

	const {upload, url} = usePostStorage()

	async function getTotalCount() {
		total.value = (await getCountFromServer(coll)).data().count
	}

	async function fetch() {
		lim.value = 25
		await getTotalCount()
		await useCollection<Post>(_query, {
			target: posts
		}).promise.value
		fetched.value = true
	}

	async function fetchMore() {
		if (lim.value >= total.value) return
		
		useState('postsLimit', () => lim.value + 20)
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
			date: new Date().toString(),
		}

		if (image) {
			await upload(image)
			params.image = url.value as string
		}

		await addDoc(coll, params)
		total.value++
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
		fetch,
		getTotalCount,
		posts,
		lim,
		length,
		total,
		createPost,
		votePost,
		fetched,
		fetchMore
	}
}
