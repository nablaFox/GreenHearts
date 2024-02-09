<script setup lang="ts">
import '@material/web/button/filled-tonal-button.js'
import '@material/web/iconbutton/outlined-icon-button.js'
import { useFileDialog } from '@vueuse/core'

defineProps<{
	image: string
	scroll: number
}>()

const emit = defineEmits<{
	(e: 'takePhoto', image: File | null): void
}>()

const model = defineModel()

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
		model.value = false
		return
	}
	emit('takePhoto', file)
	imageTaken.value = URL.createObjectURL(file)
})
</script>

<template>
  <div
    class="border-b rounded-b-[30px] overflow-hidden"
    @click="() => imageTaken && !scroll && (model = !model)"
  >
    <img
      :class="{ box: !imageTaken }"
      :src="imageTaken || image"
      class="h-full w-[200%] object-center object-cover test"
    >

    <div
      v-if="!imageTaken"
      class="abs-center flex-center py-4 w-full backdrop-blur-[15px] text-2xl font-[Montserrat] font-extrabold text-on-primary font-medium"
    >
      <md-filled-tonal-button
        class="text-lg font-bold"
        @click="open"
      >
        Take the photo 
        <Icon
          slot="icon"
          size="32"
          name="ic:baseline-camera"
        />
      </md-filled-tonal-button>
    </div>

    <div
      v-else
      class="absolute right-[20px] bottom-[10px] rounded-[100%] bg-background"
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
	animation: press 2s infinite;
}

@keyframes press {
   0%,  100% { opacity:  1; }
   50% { opacity:  0.70; } 
}

md-filled-tonal-button {
	--md-filled-tonal-button-icon-size: 24px;
}
</style>

