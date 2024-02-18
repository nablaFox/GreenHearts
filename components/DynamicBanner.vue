<script setup lang="ts">
import '@material/web/iconbutton/icon-button.js'

interface Props {
	maxScroll: number	
	minOpacity?: number
	initialPadding?: number
	minPadding?: number	
	scroll: number
	goBack?: boolean
	noPaddingAnimation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	minOpacity: 0,
	initialPadding: 28,
	minPadding: 18,
})

const opacity = computed(() => (props.scroll / props.maxScroll) + props.minOpacity)

const paddingLeft = computed(() => {
	if (props.noPaddingAnimation) return props.initialPadding + 'px'
	return props.initialPadding + props.minPadding - ((props.scroll / props.maxScroll) * props.initialPadding) + 'px'
})
</script>

<template>
  <header class="flex flex-col">
    <md-icon-button
      v-if="goBack"
      class="ml-3 mt-3 z-[100]"
      @click="$router.back()"
    >
      <Icon
        name="ic:baseline-arrow-back"
        size="24"
      />
    </md-icon-button>
    <div 
      :style="{ opacity }"
      class="bg-surface-variant abs-center w-full h-full will-change-[opacity]" 
    />

    <div
      :style="{ paddingLeft }"
      class="mt-auto"
    >
      <slot />
    </div>
  </header>
</template>

