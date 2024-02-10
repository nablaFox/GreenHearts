<script setup lang="ts">
import '@material/web/iconbutton/outlined-icon-button.js'

const openRules = ref(false)
</script>

<template>
  <div class="flex justify-between w-full px-4 pt-4 pb-8 align-center max-w-[1200px] mx-auto">
    <h2 class="text-primary font-bold font-[Pacifico] text-xl cursor-pointer">
      Green Hearts
    </h2>
    <md-outlined-icon-button @click="openRules = true">
      <Icon
        name="ic:baseline-book"
        size="24"
      />
    </md-outlined-icon-button>
  </div>

  <BottomSheet v-model="openRules">
    <AppRules />
  </BottomSheet>
</template>

