<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <div class="mx-4 rounded-xl bg-surface border border-outline-variant px-4 py-3 flex-center gap-2 text-on-surface">
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

