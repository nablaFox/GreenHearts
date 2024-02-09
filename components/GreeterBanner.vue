<script setup lang="ts">
import '@material/web/iconbutton/icon-button.js'

const props = defineProps<{
	head?: string
	title?: string
}>()	
</script>

<template>
  <header class="flex flex-col justify-between w-full">
    <md-icon-button
      class="mt-2 z-[100] self-end"
      @click=""
    >
      <Icon
        name="ic:round-more-vert"
        size="24"
      />
    </md-icon-button>
		
    <div>
      <h3 class="font-extrabold text-xl text-on-background">
        {{ head }}
      </h3>
      <h1 class="font-extrabold text-3xl text-primary">
        {{ title }}
      </h1>
    </div>
  </header>
</template>

