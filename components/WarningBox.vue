<script setup lang="ts" generic="T">
const props = defineProps<{
	text?: string
	duration?: number
}>()

const error = defineModel<T>()

watch(error, now => {
	now && setTimeout(() => error.value = undefined, props.duration || 4000)
})
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="error"
        class="bg-error-container rounded-2xl px-5 py-2 text-on-error-container font-semibold text-sm flex-center fixed bottom-4 abs-center-x w-[max-content]"
      >
        {{ text }}
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: all .4s cubic-bezier(0.55, 0, 0.1, 1);
}

.v-enter-from,
.v-leave-to {
	transform: translate(-50%, 120%);
	opacity: 0;
}
</style>
