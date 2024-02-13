<script setup lang="ts">	
import '@material/web/button/filled-button.js'
import '@material/web/button/filled-tonal-button.js'

defineProps<{
	disabled: boolean
}>()

defineEmits(['submit'])
</script>

<template>
  <footer class="fixed bottom-1 w-[98%] left-[50%] -translate-x-2/4 bg-surface">
    <md-filled-tonal-button
      :disabled="disabled"
      type="submit"
      class="w-full text-[16px] py-3 font-normal"
      @click="$emit('submit')"
    >
      Publish Post
    </md-filled-tonal-button>
  </footer>
</template>

