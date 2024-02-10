import { doc, onSnapshot, getDoc } from 'firebase/firestore'
import { 
	GoogleAuthProvider ,
	signInWithPopup,
	type Auth
} from 'firebase/auth'
import type { Stats } from '@/types'

interface User {
	name: string,
	stats: Stats,
}

export function useUser() {
	const db = useFirestore()
	const data = useState<User | undefined>('userData')
	const stats = computed(() => data.value?.stats)
	const fetched = computed(() => !!data.value)
	const id = useState<string>()
	const isLogged = computed(() => !!id.value)
	const checkAdmin = (id: string) => id == 'tmz6u1K6roO7c0lr2v7DkEc9Raj2' 
	const isAdmin = useState<boolean>('admin', () => false)
	const auth = useFirebaseAuth() as Auth

	async function signup() {
	}

	async function login() {
		const googleProvider = new GoogleAuthProvider()
		await signInWithPopup(auth, googleProvider)
		return await fetch()
	}

	function logout() {
		auth?.signOut()
	}

	// returns true only if user exists
	async function fetch() {
		if (fetched.value) return true

		const user = await getCurrentUser()
		if (!user) return false

		isAdmin.value = checkAdmin(user.uid)
		const uid = isAdmin.value ? 'Fw7RBsTJbVQFuI42dKsgZfU70SZ2' : user.uid
		const docRef = doc(db, 'users', uid)

		if (!(await getDoc(docRef)).exists()) return false

		onSnapshot(docRef, (doc) => {
			data.value = doc.data() as User
		})

		let _data = null
		while (!_data) {
			_data = data.value
			await new Promise((r) => setTimeout(r, 100))
		}

		id.value = uid
		return true
	}

	return { 
		login,
		logout,
		signup,
		isAdmin,
		data,
		stats,
		fetch, 
		fetched,
		isLogged,
		id
	}
}
