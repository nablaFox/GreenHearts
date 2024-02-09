<script setup lang="ts">	
import '@material/web/button/filled-button.js'

defineProps(['disabled'])
defineEmits(['submit'])
</script>

<template>
  <footer class="fixed bottom-1 w-[98%] left-[50%] -translate-x-2/4 bg-white">
    <md-filled-button
      :disabled="disabled"
      type="submit"
      class="w-full text-[16px] py-3 font-normal font-[Montserrat]"
      @click="$emit('submit')"
    >
      Publish Post
    </md-filled-button>
  </footer>
</template>

