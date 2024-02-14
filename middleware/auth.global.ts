export default defineNuxtRouteMiddleware(async (to, _) => {
	const { isLogged, fetch } = useUser()

	to.path !== '/login' && await fetch() 

	if (!isLogged.value && to.path != '/login') return navigateTo('/login')
})

