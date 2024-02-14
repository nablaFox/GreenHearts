<script setup lang="ts">
const emit = defineEmits(['login'])
</script>

<template>
  <form
    class="flex-center w-[380px] h-[250px]"
    @submit.prevent
  >
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
