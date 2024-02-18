<script setup lang="ts">
const isNavVisible = ref(true)
const fab = ref(true)

function toggleNav() {
	isNavVisible.value = !isNavVisible.value
}

function closeNav() {
	isNavVisible.value = false
}

function openNav() {
	isNavVisible.value = true
}

provide('navbar', {
	toggleNav,
	isNavVisible,
	closeNav,
	openNav
})

provide('fab', {
	fab,
})
</script>

<template>
  <div>
    <slot />
    <PostsFab
      v-if="fab"
      :is-nav-visible="isNavVisible"
    />
    <NavBar
      class="navbar fixed bottom-0"
      :class="{ 'translate-y-full': !isNavVisible }"
    />
  </div>
</template>

<style scoped>
.navbar {
	transition: transform 0.2s, background-color .35s cubic-bezier(0.05, 0.7, 0.1, 1.0);
}
</style>
