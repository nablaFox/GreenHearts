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

const opacity = computed(() => (props.scroll / props.maxScroll) + (props.minOpacity || .4))
const paddingLeft = computed(() => ((props.initialPadding || 28) + (props.minPadding || 12)) - ((props.scroll / props.maxScroll) * (props.initialPadding || 28)) + 'px')
</script>

<template>
  <div>
    <header class="ml-2 mt-3 fixed top-0 w-full z-[100]">
      <md-icon-button @click="$router.push('/')">
        <Icon
          name="ic:baseline-arrow-back"
          size="24"
        />
      </md-icon-button>
    </header>
    <div class="h-[193px] flex items-end">
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
    </div>
  </div>
</template>

