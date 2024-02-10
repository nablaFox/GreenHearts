<script setup lang="ts">
import '@material/web/iconbutton/icon-button.js'

const props = defineProps<{
	maxScroll: number	
	minOpacity?: number
	initialPadding?: number
	minPadding?: number	
	title?: string
	scroll: number
}>()

const opacity = computed(() => (props.scroll / props.maxScroll) + (props.minOpacity || .1))
const paddingLeft = computed(() => ((props.initialPadding || 28) + (props.minPadding || 18)) - ((props.scroll / props.maxScroll) * (props.initialPadding || 28)) + 'px')
</script>

<template>
  <header class="flex flex-col justify-between">
    <md-icon-button
      class="ml-3 mt-3 z-[100]"
      @click="$router.push('/app')"
    >
      <Icon
        name="ic:baseline-arrow-back"
        size="24"
      />
    </md-icon-button>
    <div 
      :style="{opacity }"
      class="abs-center w-full h-full bg-secondary-container will-change-[opacity]" 
    />
    <h1 
      class="pb-3 font-black text-4xl text-on-secondary-container will-change-[padding]"
      :style="{ paddingLeft }"
    >
      {{ title }}
    </h1>
  </header>
</template>

