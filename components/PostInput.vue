<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <div class="mx-4 rounded-xl bg-surface border px-4 py-3 flex-center gap-2">
    <input
      v-model="model"
      class="grow font-bold"
      type="text"
      placeholder="Title"
    >
			
    <Icon
      name="material-symbols:title"
      size="24"
    />
  </div>
</template>

