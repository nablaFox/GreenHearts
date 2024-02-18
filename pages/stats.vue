<script setup lang="ts">
// TODO: change the layout based on the screen size
definePageMeta({
	layout: 'mobile'
})

const el = ref<HTMLElement | null>(null)
useAnimateNavbar(el)
</script>

<template>
  <main
    ref="el"
    class="full-scroller"
  >
    <section class="page-size !min-h-[calc(100svh+70px)] flex flex-col gap-[45px] max-w-[600px]">
      <StatsMenu class="absolute right-0 mt-4" />
      <GreeterBanner
        class="h-[150px]"
        head="What's up"
        title="Amore mio"
      />

      <HeartStats class="" />
      <TotalStat class="-mt-7" />

      <Placeholder class="h-[120px]" />

      <MetricsStat />
    </section>
  </main>
</template>
