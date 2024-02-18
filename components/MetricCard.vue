<script setup lang="ts">
defineProps<{
	icon: string,
	data: string,
	title: string	
}>()
</script>

<template>
  <div class="rounded-xl bg-surface-surface-container border border-outline-variant p-2 text-sm flex-center gap-2 text-on-surface">
    <div class="bg-tertiary-container rounded-full w-10 h-10 flex-center">
      <Icon
        class="text-on-secondary-container"
        :name="icon"
        size="30"
      />
    </div>

    <div class="px-2 text-lg font-bold flex flex-col">
      {{ data }}
      <span class="text-sm text-on-surface-variant -mt-2"> 
        {{ title }}
      </span>
    </div>
  </div>
</template>
