export default defineNuxtRouteMiddleware(async () => {	
	const { fetched, fetch } = usePosts() 

	!fetched.value && await fetch()
})

