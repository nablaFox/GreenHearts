<script setup lang="ts">
import '@material/web/button/filled-tonal-button.js'
import '@material/web/button/filled-button.js'
import '@material/web/iconbutton/outlined-icon-button.js'

defineProps<{
	image: string
	scroll: number
	cta: string
}>()

const emit = defineEmits<{
	(e: 'takePhoto', image: File | null): void
}>()

const fullScreen = defineModel<boolean>()

const { files, open, reset, onChange } = useFileDialog({
	accept: 'image/*',
	multiple: false,
})

const imageTaken = ref('')

onChange(() => {
	const file = files.value?.item(0)
	if (!file) {
		emit('takePhoto', null)
		imageTaken.value = ''
		fullScreen.value = false
		return
	}
	emit('takePhoto', file)
	imageTaken.value = URL.createObjectURL(file)
})
</script>

<template>
  <div
    class="rounded-b-[30px] overflow-hidden bg-surface-container-high"
    @click="() => imageTaken && !scroll && (fullScreen = !fullScreen)"
  >
    <NuxtImg 
      :class="{ box: !imageTaken }"
      :src="imageTaken || image"
      preload
      class="h-full w-full object-cover"
    />

    <div
      v-if="!imageTaken"
      class="abs-center flex-center py-4 w-full backdrop-blur-[15px] text-2xl text-on-primary font-medium"
    >
      <md-filled-tonal-button
        class="text-lg font-bold"
        @click="open"
      >
        {{ cta }}
        <Icon
          slot="icon"
          size="32"
          name="ic:baseline-camera"
        />
      </md-filled-tonal-button>
    </div>

    <div
      v-else
      class="absolute right-5 bottom-2.5 rounded-full bg-background"
    >
      <md-outlined-icon-button
        class="text-lg font-bold z-[10]"
        @click="reset"
      >
        <Icon 
          size="32"
          name="ic:round-delete"
        />
      </md-outlined-icon-button>
    </div>
  </div>
</template>

<style scoped>
.box {
	animation: press 2.5s infinite;
}

@keyframes press {
   0%,  100% { opacity:  1; }
   50% { opacity:  0.75; } 
}

md-filled-tonal-button {
	--md-filled-tonal-button-icon-size: 24px;
}
</style>

