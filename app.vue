<script setup lang="ts">
const posts = usePosts()
const stats = useStats()

await callOnce(async () => {
	console.log('flag')
	await posts.fetch() 
	await stats.fetch()
})	
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
