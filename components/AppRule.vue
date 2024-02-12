<script setup lang="ts">
defineProps(['title'])	
</script>

<template>
  <div class="rule">
    <h2 class="mb-1 text-xl font-extrabold">
      {{ title }}
    </h2>
		
    <slot />
  </div>
</template>

