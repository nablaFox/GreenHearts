<script setup lang="ts">
defineProps<{
	visible: boolean
	text: string
}>()

</script>

<template>
  <Transition>
    <div
      v-if="visible"
      class="bg-error-container rounded px-5 py-2 text-on-error-container"
    >
      {{ text }}
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
