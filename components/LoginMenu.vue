<script setup lang="ts">
const emit = defineEmits(['login'])
</script>

<template>
  <form
    class="flex-center w-[380px] mx-[auto] h-[250px]"
    @submit.prevent
  >
    <div class="absolute w-full h-full">
      <img
        src="/blob-2.gif"
        class="abs-center opacity-[20%]"
      >
      <img
        src="/blob-1.gif"
        class="abs-center opacity-[80%]"
      >
    </div>
    <md-outlined-button
      class="w-40"
      trailing-icon="true"
      @click="$emit('login')"
    >
      <Icon
        slot="icon"
        name="bxl:google"
      />
      Login
    </md-outlined-button>
  </form>
</template>
