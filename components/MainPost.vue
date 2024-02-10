<script setup lang="ts">
import type { Post, Vote, VoteType } from '@/types'

const props = defineProps<Post>()

const { votePost } = usePosts()

function onVote(vote: Vote, negative: boolean) {		
	votePost(props.id, vote, negative)
}

const onlyImage = !props.title && !props.notes && props.image
const onlyTitle = props.title && !props.notes && !props.image 

const img = useImage()
</script>

<template>
  <div
    class="rounded-3xl flex flex-col border md:w-[500px] bg-secondary-container border border-outline"
  >
    <div
      v-if="image"
      :style="{ backgroundImage: `url(${img(props.image)})` }"
      class="bg-cover bg-center h-[340px] w-full rounded-3xl"
    />
    <div
      class="px-6 pt-3 pb-6 flex flex-col"
      :class="{ '!pb-8': onlyImage, '!py-4': onlyTitle }"
    >
      <h2
        v-if="title"
        class="font-extrabold text-lg text-ellipsis overflow-hidden"
        :class="{'w-[calc(100%-120px)]': onlyTitle, 'pb-4': !notes }"
      >
        {{ title }}
      </h2>
      <p
        v-if="notes"
        class="text font-semibold pb-7"
      >
        {{ notes }}
      </p>
    </div>

    <div
      class="absolute right-[20px] bottom-[10px] flex items-center"
      :class="{ '!bottom-[2px]': onlyImage || !notes }" 
    >
      <VoteButton
        v-for="color in ['green', 'blue', 'red']"
        :key="color"
        :type="color as VoteType"
        :score="props[color as VoteType]"
        @vote="onVote"
      />
    </div>
  </div>
</template>

<style scoped>
p {
	hyphens: auto;
  word-break: break-word;
}
</style>

