<script setup lang="ts">
import type { Post, Vote, VoteType } from '@/types'

interface ClientPost extends Post {
	exDate?: string
}

const props = defineProps<ClientPost>()

const { votePost } = usePost()

function onVote(vote: Vote, negative: boolean) {		
	votePost(props.id, vote, negative)
}

const onlyImage = computed(() => !props.title && !props.notes && props.image)
</script>

<template>
  <div class="rounded-3xl flex flex-col border w-[380px] md:w-[500px] bg-secondary-container">
    <img
      :src="image"
      class="rounded-3xl object-cover max-h-[320px]"
    >
    <div
      class="px-5 pt-3 pb-6 flex flex-col"
      :class="{ '!pb-8': onlyImage }"
    >
      <h2
        v-if="title"
        class="font-extrabold text-lg font-[Montserrat]"
      >
        {{ title }}
      </h2>
      <p
        v-if="notes"
        class="text font-[Montserrat] font-semibold"
      >
        {{ notes }}
      </p>
    </div>

    <div
      class="absolute right-[20px] bottom-[10px] flex items-center"
      :class="{ '!bottom-[2px]': onlyImage }"
    >
      <VoteButton
        v-for="color in ['green', 'white', 'red']"
        :key="color"
        :type="color as VoteType"
        :score="props[color as VoteType]"
        @vote="onVote"
      />
    </div>
  </div>
</template>

