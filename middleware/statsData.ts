export default defineNuxtRouteMiddleware(async () => {	
	const { fetched, fetch } = useStats() 

	!fetched.value && await fetch()
})
