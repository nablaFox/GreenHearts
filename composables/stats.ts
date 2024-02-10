import { doc, onSnapshot } from 'firebase/firestore'
import type { Stats } from '@/types' 

export function useStats() {
	const db = useFirestore()
	const stats = useState<Stats | undefined>('stats')	
	const fetched = useState<boolean>('statsFetched')	
	const docRef = doc(db, 'stats', 'base')
	const posts = usePosts()

	if (!posts.total.value) {
		posts.getTotalCount()
	}

	const totalValue = computed(
		() => stats.value && Math.floor(stats.value.red * -2 + stats.value.green + stats.value.blue * .1)
	)

	const total = computed(() => stats.value && stats.value.red + stats.value.green + stats.value.blue)

	const notCounted = computed(() => total.value && (posts.total.value - total.value))

	async function fetch() {
		if (fetched.value) return

		onSnapshot(docRef, (doc) => {
			stats.value = doc.data() as Stats
		})

		let _stats = null
		while (!_stats) {
			_stats = stats.value
			await new Promise((r) => setTimeout(r, 100))
		}		

		fetched.value = true
	}

	return { stats, total, notCounted, fetch, totalValue, fetched }
}
