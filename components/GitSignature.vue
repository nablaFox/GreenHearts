<script setup lang="ts">
defineProps<{
	text: string
}>()
</script>

<template>
  <div class="flex items-center gap-1 select-none">
    <a href="https://github.com/nablaFox">
      <Icon
        name="bxl:github"
        size="24"
        class="opacity-[50%]"
      />
    </a>
    <span class="font-[500] text-on-background opacity-[70%]">{{ text }}</span>
  </div>
</template>

