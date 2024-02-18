<script setup lang="ts">
defineProps<{
	head?: string
	title?: string
}>()	
</script>

<template>
  <header class="flex flex-col justify-end">
    <h3 class="font-extrabold text-xl text-on-background">
      {{ head }}
    </h3>
    <h1 class="font-extrabold text-3xl text-primary">
      {{ title }}
    </h1>
  </header>
</template>

