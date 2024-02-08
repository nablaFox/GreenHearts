<script setup lang="ts">
const isNavVisible = ref(true)

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
</script>

<template>
  <div>
    <slot />
    <NavBar
      class="navbar fixed bottom-0"
      :class="{ 'translate-y-full': !isNavVisible }"
    />
  </div>
</template>

<style scoped>
.navbar {
	transition: transform 0.2s;
}
</style>
