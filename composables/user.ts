import type { User } from '@/types'
import { getAuth } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { 
	GoogleAuthProvider ,
	signInWithPopup,
} from 'firebase/auth'

export function useUser() {
	const db = useFirestore()
	const isAdmin = useState<boolean>('isAdmin', () => false)
	const data = useState<User | undefined>('user')
	const isLogged = computed(() => !!data.value)
	const stats = computed(() => data.value?.stats)
	const auth = getAuth()

	async function login() {	
		const googleProvider = new GoogleAuthProvider()
		await signInWithPopup(auth, googleProvider)	
		await fetch()
		return isLogged.value
	}

	async function fetch() {
		if (isLogged.value) return

		const user = await getCurrentUser()
		// TODO: use this only if admin, else use user.uid
		const docRef = doc(db, 'users', useRuntimeConfig().public.privateUser) 
		let fetchError = false

		onSnapshot(docRef, (doc) => {
			data.value = doc.data() as User
		}, () => {
			fetchError = true
			data.value = undefined
			console.error('Error fetching private data')
		})

		let _data = null
		while (!_data && !fetchError) {
			_data = data.value
			await new Promise((r) => setTimeout(r, 100))
		}

		if (!_data) return
		isAdmin.value = _data.admins.includes(user.uid)
	}

	function logout() {
		auth?.signOut()
		data.value = undefined
	}

	return { 
		login,
		logout,
		isLogged,
		isAdmin,
		stats,
		data,
		fetch
	}
}
