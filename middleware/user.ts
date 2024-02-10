export default defineNuxtRouteMiddleware(async (to, from) => {
	const { fetch, fetched } = useUser()
	!fetched.value && (await fetch())
})
