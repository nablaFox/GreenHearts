export default defineNuxtRouteMiddleware(async (to, from) => {
	const { isLogged, fetch } = usePrivate()

	if (to.path == '/login') return
	
	await fetch()

	if (!isLogged.value && to.path != '/login') return navigateTo('/login')
})
