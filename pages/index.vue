<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'

definePageMeta({
	middleware: 'posts'
})

const el = ref<HTMLElement | null>(null)
const { isNavVisible } = useAnimateNavbar(el)

const { posts, fetchMore } = usePost()

useInfiniteScroll(
	el, 
	async () => await fetchMore(), 
	{ distance: 80}
)
</script>

<template>
  <main
    ref="el"
    class="full-scroller"
  >
    <MainHeader />
    <div class="w-[93%] min-h-[calc(100svh-20px)] max-w-[1200px] mx-auto flex flex-col items-center gap-5 min-h-[100svh] overflow-y-scroll scrollbar-none pb-24">
      <MainPost
        v-for="(post, index) in posts"
        :id="post.id"
        :key="index"
        :title="post?.title"
        :notes="post?.notes"
        :image="post?.image"
        :green="post?.green"
        :white="post?.white"
        :red="post?.red"
        :prev-date="index ? posts[index - 1]?.date : undefined"
      />
    </div>

    <PostsFab :is-nav-visible="isNavVisible" />
  </main>
</template>

