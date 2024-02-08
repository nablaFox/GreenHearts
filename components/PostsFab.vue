<script setup lang="ts">
import '@material/web/fab/fab.js'
defineProps(['isNavVisible'])
</script>

<template>
  <md-fab
    aria-label="Edit"
    :class="[ isNavVisible ? 'bottom-[100px]' : 'bottom-[15px]', 'fixed right-[15px] transition-[bottom] duration-[.2s]' ]"
    @click="$router.push('/maker')"
  >
    <Icon
      slot="icon"
      name="ic:round-plus"
    />
  </md-fab>
</template>

