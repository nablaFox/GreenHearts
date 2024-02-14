import type { User } from '@/types'
import { getAuth } from 'firebase/auth'
import { doc, onSnapshot, getDoc } from 'firebase/firestore'
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

	async function login(adminClaim?: boolean) {	
		const googleProvider = new GoogleAuthProvider()
		await signInWithPopup(auth, googleProvider)	
		return await fetch(adminClaim)
	}

	async function fetch(adminClaim?: boolean) {
		if (isLogged.value) return true

		const user = await getCurrentUser()
		const id = adminClaim ? useRuntimeConfig().public.privateUser : user?.uid
		const docRef = doc(db, 'users', id)

		const res = await getDoc(docRef).catch(() => {
			console.error('Auth failed')
		})

		if (!res || !res.exists()) return false

		data.value = res.data() as User
		isAdmin.value = adminClaim || false

		onSnapshot(docRef, (doc) => {
			data.value = doc.data() as User
		}, () => {
			data.value = undefined
			console.error('Error fetching private data')
		})

		return true
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
