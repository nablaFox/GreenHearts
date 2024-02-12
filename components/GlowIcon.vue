<script setup lang="ts">
import { theme } from '#tailwind-config'

export interface Props {
	name?: string
	size?: string
	color: string
	colorModifier?: string
	glow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	glow: true,
	size: '24px',
	name: '',
	colorModifier: '500',
})

const _color = computed(() => {
	const colors = theme.colors as any
	if (props.colorModifier)
		return colors[props.color][props.colorModifier]

	return colors[props.color]	
})
</script>

<template>
  <Icon
    :name="name"
    :size="size"
    :style="[glow && `filter: drop-shadow(0 0 6px ${_color})`]"
  />
</template>

<style scoped>
</style>
