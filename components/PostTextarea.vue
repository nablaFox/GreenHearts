<script setup lang="ts">
const model = defineModel<string>()	
const { textarea } = useTextareaAutosize()
</script>

<template>
  <div class="mx-4 bg-surface border border-outline-variant rounded-xl flex-center py-3 px-4 gap-2 text-on-surface font-medium">
    <textarea
      ref="textarea"
      v-model="model"
      class="resize-none grow min-h-32"
      placeholder="Notes"
    />

    <Icon
      name="material-symbols:sticky-note-2"
      size="24"
    />
  </div>
</template>

