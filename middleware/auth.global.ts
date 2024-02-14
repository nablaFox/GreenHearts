export default defineNuxtRouteMiddleware(async (to, _) => {
	const { isLogged, fetch } = useUser()

	if (to.path == '/login') return
	
	await fetch()

	if (!isLogged.value && to.path != '/login') return navigateTo('/login')
})

