<script lang="ts" setup>
defineProps<{	
	bg?: string
}>()
</script>

<template>
  <span>
    <div
      :class="bg"
      class="w-[95%] abs-center-y h-2 z-[-1] "
    />
    <slot />
  </span>
</template>

