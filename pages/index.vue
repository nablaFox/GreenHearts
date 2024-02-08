<script setup lang="ts">
const el = ref<HTMLElement | null>(null)
const { isNavVisible } = useAnimateNavbar(el)

const { posts } = usePost()
</script>

<template>
  <main
    ref="el"
    class="full-scroller"
  >
    <MainHeader />
    <div class="w-[93%] min-h-[calc(100svh-20px)] max-w-[1200px] mx-auto flex flex-col items-center gap-5 min-h-[100svh] overflow-y-scroll scrollbar-none pb-24">
      <MainPost
        v-for="post in posts"
        :id="post.id"
        :key="post.id"
        :title="post.title"
        :notes="post.notes"
        :image="post.image"
        :green="post.green"
        :white="post.white"
        :red="post.red"
      />
    </div>

    <PostsFab :is-nav-visible="isNavVisible" />
  </main>
</template>

