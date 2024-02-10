<script setup lang="ts">
const props = defineProps<{
	name?: string
	size?: string
	color: string
	colorModifier?: string
}>()

import { theme } from '#tailwind-config'

const _color = computed(() => {
	const colors = theme.colors as any
	if (props.colorModifier)
		return colors[props.color][props.colorModifier]

	return colors[props.color]	
})
</script>

<template>
  <Icon
    :name="name || ''"
    :size="size"
    :style="{ filter: `drop-shadow(0 0 6px ${_color})` }"
    :color="_color.value"
  />
</template>

<style scoped>


</style>
