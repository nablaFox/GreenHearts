import type { User } from '@/types'
import { getAuth } from 'firebase/auth'
import { doc, onSnapshot, getDoc } from 'firebase/firestore'
import { 
	GoogleAuthProvider ,
	signInWithPopup,
} from 'firebase/auth'


interface FetchResult {
	error?: string
	data?: User
}

export function useUser() {
	const db = useFirestore()
	const isAdmin = useState<boolean>('isAdmin', () => false)
	const data = useState<User | undefined>('user')
	const isLogged = computed(() => !!data.value)
	const stats = computed(() => data.value?.stats)
	const auth = getAuth()
	const userId = useState<string>('userId')

	async function login(adminClaim?: boolean) {	
		const googleProvider = new GoogleAuthProvider()
		await signInWithPopup(auth, googleProvider)	
		return await fetch(adminClaim)
	}

	function returnError(message: string) {
		return { error: message }
	}

	async function fetch(adminClaim?: boolean): Promise<FetchResult> {
		if (!!data.value) return { data: data.value }
		const { uid } = await getCurrentUser()
		const id = adminClaim ? useRuntimeConfig().public.privateUser : uid
		const docRef = doc(db, 'users', id)

		const res = await getDoc(docRef).catch(e => console.error(e))

		if (!res) 
			return returnError('Authentication failed 😔') 

		if (!res.exists())
			return returnError('User not found 😟')

		userId.value = id
		data.value = res.data() as User
		localStorage.setItem('logged', 'true')

		isAdmin.value = data.value.admins?.includes(uid) || false

		onSnapshot(docRef, (doc) => {
			data.value = doc.data() as User
		}, e => {
			data.value = undefined
			console.error('Error fetching private data')
			console.log(e.code, ':', e.message, 'cause:', e.cause)
			localStorage.removeItem('logged')	
		})

		return { data: data.value }
	}

	function logout() {
		auth?.signOut()
		data.value = undefined
	}

	return { 
		userId,
		login,
		logout,
		isLogged,
		isAdmin,
		stats,
		data,
		fetch
	}
}
