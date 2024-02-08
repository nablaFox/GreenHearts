import {doc, getDoc} from 'firebase/firestore'

export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = await getCurrentUser()

	const redirect = () =>
		navigateTo({
			path: '/login',
			query: {
				redirect: '/'
			}
		})

	if (!user && to.path !== '/login') {
		return redirect()
	}

	if (to.path == '/login' && !user) return

	const docRef = doc(useFirestore(), 'users', user.uid)
	const authUser = await getDoc(docRef)

	const login = useState('login-failed', () => false)

	if (!authUser.exists() && to.path != '/login') {
		login.value = true
		return redirect()
	}

	login.value = false

	const data = authUser.data();

	if (data?.admin) {
		localStorage.setItem('admin', 'true')
	} else {
		localStorage.setItem('admin', 'false')
	}

})

