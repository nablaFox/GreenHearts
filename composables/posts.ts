import { collection, query, limit, orderBy, addDoc, updateDoc, increment, doc, getCountFromServer, onSnapshot } from 'firebase/firestore'
import type { Post, Vote } from '@/types'

export function usePosts() {
	const db = useFirestore()
	const coll = collection(db, 'posts')
	const lim = useState<number>('postsLimit')
	const total = useState<number>('postsTotal')
	const posts = useState<Post[]>('posts')
	const fetched = useState<boolean>('postsFetched')
	const loading = useState<boolean>('createPostProgress')
	const length = computed(() => posts.value?.length)

	async function getTotalCount() {
		total.value = (await getCountFromServer(coll)).data().count
	}

	async function fetch() {
		if (fetched.value) return

		const _query = computed(
			() => query(coll, orderBy('date', 'desc'), limit(lim.value))
		)

		await getTotalCount()	
		lim.value = 25

		// TODO: fix vue inject issue
		await useCollection(_query, {
			target: posts,
		}).promise.value

		fetched.value = true
	}

	async function fetchMore() {
		if (lim.value >= total.value) return	
		lim.value += 25
	}

	type CreatePostParams = {
		title: string | undefined
		notes: string | undefined
		image: File | null
	}

	async function createPost({title, notes, image}: CreatePostParams) {
		if (!title && !image) return
		loading.value = true

		const params = {
			title,
			notes,
			image: null as string | null,
			date: new Date().toString(),
		}

		if (image) {
			const { url } = await usePostsStorage().upload(image)
			if (!url) return (loading.value = false)
			params.image = url
		}

		await addDoc(coll, params)
		total.value++
		loading.value = false
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
		loading,
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
