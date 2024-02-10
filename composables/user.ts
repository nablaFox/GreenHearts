import { doc, onSnapshot } from 'firebase/firestore'
import type { Stats } from '@/types'

interface User {
	name: string,
	stats: Stats
}

export function useUser() {
	const db = useFirestore()
	const data = useState<User | undefined>('userData')
	const stats = computed(() => data.value?.stats)
	const fetched = computed(() => !!data.value)
	const id = useState<string>('uid')

	async function fetch() {
		const uid = localStorage.getItem('admin') === 'true' ?
			'Fw7RBsTJbVQFuI42dKsgZfU70SZ2' :
			(await getCurrentUser()).uid			

		const docRef = doc(db, 'users', uid)

		onSnapshot(docRef, (doc) => {
			data.value = doc.data() as User
		})

		let _data = null
		while (!_data) {
			_data = data.value
			await new Promise((r) => setTimeout(r, 100))
		}

		id.value = uid
	}

	return { 
		data,
		stats,
		fetch, 
		fetched,
		id
	}
}
