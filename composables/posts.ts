import { 
	collection, 
	query, 
	limit, 
	orderBy, 
	addDoc, 
	updateDoc, 
	increment, 
	doc, 
	getCountFromServer, 
	onSnapshot,
} from 'firebase/firestore'
import type { Post, Vote } from '@/types'

export function usePosts() {
	const db = useFirestore()
	const lim = useState<number>('postsLimit')
	const total = useState<number>('postsTotal')
	const posts = useState<Post[]>('posts')
	const loading = useState<boolean | undefined>('createPostProgress')
	const length = computed(() => posts.value?.length)
	const postsColl = collection(db, 'users/private/posts')
	const { error, setError } = makeError<boolean>('postsError') 

	async function getTotalCount() {
		total.value = (await getCountFromServer(postsColl)).data().count
	}

	async function fetch() {
		const _query = computed(
			() => query(postsColl, orderBy('date', 'desc'), limit(lim.value))
		)

		watch(_query, q => {
			onSnapshot(q, (snap) => {
				posts.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post))
			}, () => setError(true))
		})

		await getTotalCount()	
		lim.value = 25

		let _posts = null
		while (!_posts && total.value) {
			_posts = posts.value
			await new Promise((r) => setTimeout(r, 100))
		}

		await getTotalCount()	
		lim.value = 17
	}

	function fetchMore() {
		if (lim.value >= total.value) return	
		lim.value += 25
	}

	type CreatePostParams = {
		title: string | undefined
		notes: string | undefined
		image: File | null
	}

	async function createPost({ title, notes, image }: CreatePostParams) {
		if (!title && !image) return
		loading.value = true

		const params = {
			title,
			notes,
			image: null as string | null,
			date: new Date().toString(),
		}

		if (image) {
			const result = await usePostsStorage().upload(image)
				.catch(() => {
					loading.value = false
					setError(true)
				})

			if (!result) return
			params.image = (result as any).url
		}

		await addDoc(postsColl, params).catch(() => error.value = true)
	
		getTotalCount()
		loading.value = false
	}

	async function votePost(id: string, vote: Vote, negative: boolean) {
		const _score = vote.score || 1
		const update = negative ? -_score : _score

		await updateDoc(doc(db, 'users/private/posts', id), {
			[vote.type]: increment(update)
		}).catch(() => setError(true))

		await updateDoc(doc(db, 'users/private'), {
			[`stats.${vote.type}`]: increment(update)
		}).catch(() => setError(true))
	}

	return {
		error,
		loading,
		fetch,
		getTotalCount,
		posts,
		lim,
		length,
		total,
		createPost,
		votePost,
		fetchMore
	}
}
