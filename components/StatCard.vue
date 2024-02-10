<script setup lang="ts">

const props = defineProps<{
	type: 'red' | 'green' | 'white' | 'nc' | 'total' 
	title?: string
	score?: number
}>()


const colorType = () => {
	if (props.type == 'nc') return 'gray'
	if (props.type == 'white') return 'blue'
	return props.type
}
</script>

<template>
  <div
    class="stat p-2 xs:p-5 border border-outline font-medium text-on-surface-variant rounded-2xl flex-center flex-col"
  >
    <h3 class="font-extrabold text-xl capitalize">
      {{ title }}
    </h3>
    <h1
      class="mt-1 font-extrabold text-xl flex-center gap-2"
      :class="type == 'total' && 'text-2xl text-primary'"
    >
      {{ score }}
      <GlowIcon
        :glow="type != 'total'"
        :color="colorType() || 'green'"
        color-modifier="500"
        name="ic:round-favorite"
      />
    </h1>
  </div>
</template>
