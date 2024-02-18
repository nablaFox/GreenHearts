<script setup lang="ts">
defineProps<{
	head?: string
	title?: string
}>()	
</script>

<template>
  <header class="flex flex-col-reverse w-full">
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

