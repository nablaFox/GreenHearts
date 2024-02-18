<script setup lang="ts">
const destinations = [
	{ icon: 'ic:round-home', name: 'index', label: 'home' },
	{ icon: 'ic:round-favorite', name: 'posts', label: 'posts' },
]
</script>

<template>
  <nav class="bg-surface-container text-on-surface flex-center gap-[40px] w-full pb-[16px] pt-[12px] z-[9000]">
    <NavSegment
      v-for="dest in destinations"
      :key="dest.icon"
      :name="dest.name"
      :icon="dest.icon"
      :label="dest.label"
      :class="{active: $route.name === dest.name}"
    />
  </nav>
</template>

