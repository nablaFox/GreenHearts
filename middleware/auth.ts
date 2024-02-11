export default defineNuxtRouteMiddleware(async (to, from) => {
	const { isLogged, fetch } = usePrivate()

	await fetch()
	
	if (!isLogged.value && to.path !== '/login') {
		return navigateTo({
			path: '/login',
			query: {
				redirect: to.path
			}
		})
	}
})

