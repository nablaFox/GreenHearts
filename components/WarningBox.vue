<script setup lang="ts">
const props = defineProps<{
	error: boolean
	text: string
	duration?: number
}>()

const visible = ref<boolean>(false)

watch(
	() => props.error,
	now => {
		if (!now) return
		visible.value = true
		setTimeout(() => {
			visible.value = false
		}, props.duration || 4000)
	}, { immediate: true }
)
</script>

<template>
  <Teleport to="body">
    {{ error }}
    <Transition>
      <div
        v-if="visible"
        class="bg-error-container rounded-2xl px-5 py-2 text-on-error-container font-semibold text-sm flex-center fixed bottom-4 min-w-48 abs-center-x"
      >
        {{ text }}
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: transform 0.3s ease-in;
}

.v-enter-from,
.v-leave-to {
	transform: translate(-50%, 100%);
}
</style>
