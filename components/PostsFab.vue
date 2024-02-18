<script setup lang="ts">
import '@material/web/fab/fab.js'
defineProps<{
	isNavVisible: boolean
}>()

const { isAdmin } = useUser()
</script>

<template>
  <md-fab
    v-if="!isAdmin"
    class="fixed right-[15px] transition-[bottom] duration-[.2s] z-[9999]"
    :class="[ isNavVisible ? 'bottom-[100px]' : 'bottom-[15px]']"
    @click="$router.push('/maker')"
  >
    <Icon
      slot="icon"
      name="ic:round-plus"
    />
  </md-fab>
</template>

