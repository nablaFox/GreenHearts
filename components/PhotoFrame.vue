<script setup lang="ts">
import '@material/web/button/filled-tonal-button.js'

defineProps<{
	image: string
}>()
</script>

<template>
  <div class="border-b rounded-b-[30px] overflow-hidden">
    <div class="backdrop-blur-[12px]" />
    <img
      :src="image"
      width="100%"
      class="box w-full h-full object-cover object-center"
    >
    <div class="abs-center flex-center py-4 w-full backdrop-blur-[15px] text-2xl font-[Montserrat] font-extrabold text-on-primary font-medium">
      <md-filled-tonal-button class="text-lg font-bold">
        Take the photo           
        <Icon
          slot="icon"
          size="32"
          name="ic:baseline-camera"
        />
      </md-filled-tonal-button>
    </div>
  </div>
</template>

<style scoped>
.box {
	animation: press 2s infinite;
}

@keyframes press {
   0%,  100% { opacity:  1; }
   50% { opacity:  0.70; } 
}

:root {
	--md-filled-tonal-button-icon-size: 22px;
}
</style>

