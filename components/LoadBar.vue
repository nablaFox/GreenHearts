<script setup lang="ts">
const props = defineProps<{
	loading: boolean
	duration?: number
}>()

const visible = ref(false)

watch(
	() => props.loading,
	now => {	
		if (!now) visible.value = false
		setTimeout(() => {
			props.loading && (visible.value = true)
		}, props.duration || 3000)
	},
	{ immediate: true }
)
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="visible"
        class="fixed bottom-0 w-full h-1 bg-secondary z-[9999] bar"
      >
        <div class="absolute bg-surface h-full inner left-0 top-0 w-[60%]" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.inner {
	animation: moveBar 1.5s infinite;
}

.v-leave-active {
	transition: opacity .5s;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

@keyframes moveBar {
		0% {
			left: 0;
			transform: translateY(-50%);
		}
		100% {
			left: 100%;
			transform: translateY(-50%);
	}
}
</style>

