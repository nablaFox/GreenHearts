import type { Stats } from '@/types'
import { doc, onSnapshot, getDoc } from 'firebase/firestore'
import { 
	GoogleAuthProvider ,
	signInWithPopup,
	type Auth
} from 'firebase/auth'

type PrivateUser = {
	admin: boolean,
}

type PrivateUsers = {
	[id: string]: PrivateUser
}

interface PrivateData {
	stats: Stats,
	users: PrivateUsers
}

export function usePrivate() {
	const db = useFirestore()
	const isLogged = useState<boolean>('isLogged', () => false)
	const isAdmin = useState<boolean>('isAdmin', () => false)
	const data = useState<PrivateData | undefined>('privateData')
	const stats = computed(() => data.value?.stats)
	const fetched = computed(() => !!data.value)
	const fetchFailed = ref(false)
	const auth = useFirebaseAuth() as Auth

	async function signup() {
	}

	async function login() {
		const googleProvider = new GoogleAuthProvider()
		await signInWithPopup(auth, googleProvider)	
		await fetch()
		return isLogged.value
	}

	async function fetch() {
		if (fetched.value) return

		const user = await getCurrentUser()
		const docRef = doc(db, 'users', 'private')

		onSnapshot(docRef, (doc) => {
			data.value = doc.data() as PrivateData
		}, () => (fetchFailed.value = true))

		let _data = null
		while (!_data && !fetchFailed.value) {
			_data = data.value
			await new Promise((r) => setTimeout(r, 100))
		}

		if (!_data) return

		isLogged.value = true
		isAdmin.value = _data.users[user.uid].admin
	
		data.value = _data
	}

	function logout() {
		auth?.signOut()
	}

	return { 
		fetchFailed,
		login,
		logout,
		signup,
		isLogged,
		isAdmin,
		stats,
		fetch
	}
}
