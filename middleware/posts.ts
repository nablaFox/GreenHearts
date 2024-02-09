export default defineNuxtRouteMiddleware(async () => {	
	const { fetched, fetch } = usePost() 

	!fetched.value && await fetch()
})
