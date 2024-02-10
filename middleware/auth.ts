

export default defineNuxtRouteMiddleware(async (to, from) => {
	const { fetch: fetchUserData, isLogged } = useUser()
	
	const userExists = await fetchUserData()

	if (!isLogged.value && to.path !== '/login') {
		return navigateTo({
			path: '/login',
			query: {
				redirect: to.path
			}
		})
	}

	// TODO: redirect to signup
	if (!userExists && to.path !== '/login') {
		return navigateTo({
			path: '/login',
			query: {
				redirect: to.path
			}
		})
	}
})

