import type { LocalUser, User } from '@/types'
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
	const totalPosts = computed(() => data.value?.stats.total || 0)
	const auth = getAuth()
	const userId = useState<string>('userId')
	const token = useState<string>('userToken')
	
	// TODO: do not use the user id as key
	const localData = computed(
		() => JSON.parse(localStorage.getItem(userId.value) || '{}') as LocalUser | undefined
	)

	async function login(adminClaim?: boolean) {	
		const googleProvider = new GoogleAuthProvider()
		await signInWithPopup(auth, googleProvider)	
		return await fetch(adminClaim)
	}

	function returnError(message: string) {
		return { error: message }
	}

	async function fetch(adminClaim?: boolean): Promise<FetchResult> {
		if (isLogged.value) return { data: data.value }
		const user = await getCurrentUser()
	
		if (!user) 
			return returnError('Authentication failed 😔')	

		const checkAdmin = adminClaim || localStorage.getItem('isAdmin') === 'true'
		const id = checkAdmin ? useRuntimeConfig().public.privateUser : user.uid
		const docRef = doc(db, 'users', id)

		const res = await getDoc(docRef).catch(e => console.error(e))

		if (!res) 
			return returnError('Authentication failed 😔') 

		if (!res.exists())
			return returnError('User not found 😟')

		userId.value = id
		data.value = res.data() as User
		token.value = await user.getIdToken()
		isAdmin.value = data.value.admins?.includes(user.uid) || false

		// QUESTION: is this safe?
		if (process.env.NODE_ENV === 'development') {
			console.log('User logged in:', data.value)
			console.log('User token:', token.value)
			console.log('User id:', userId.value)
		}

		localStorage.setItem('isAdmin', isAdmin.value.toString())
		localStorage.setItem(userId.value, JSON.stringify({
			lastLogin: new Date(Date.now()).toString()
		} as LocalUser))

		onSnapshot(docRef, (doc) => {
			data.value = doc.data() as User
		}, () => {
			data.value = undefined
			console.error('Error fetching private data')
		})

		return { data: data.value }
	}

	function logout() {
		auth?.signOut()
		data.value = undefined
		localStorage.removeItem('isAdmin')
		localStorage.removeItem('lastQuote') // TODO: should be in quotes.ts
	}

	return { 
		localData,
		token,
		userId,
		totalPosts,
		login,
		logout,
		isLogged,
		isAdmin,
		data,
		fetch
	}
}
