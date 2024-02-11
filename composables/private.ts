import type { PrivateData } from '@/types'
import { doc, onSnapshot } from 'firebase/firestore'
import { 
	GoogleAuthProvider ,
	signInWithPopup,
	type Auth
} from 'firebase/auth'

export function usePrivate() {
	const db = useFirestore()
	const isAdmin = useState<boolean>('isAdmin', () => false)
	const data = useState<PrivateData | undefined>('privateData')
	const isLogged = computed(() => !!data.value)
	const stats = computed(() => data.value?.stats)
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
		if (isLogged.value) return

		const user = await getCurrentUser()
		const docRef = doc(db, 'users', 'private')
		let fetchError = false

		onSnapshot(docRef, (doc) => {
			data.value = doc.data() as PrivateData
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
		isAdmin.value = _data!.users[user.uid].admin	
	}

	function logout() {
		auth?.signOut()
		data.value = undefined
	}

	return { 
		login,
		logout,
		signup,
		isLogged,
		isAdmin,
		stats,
		fetch
	}
}
