<script setup lang="ts">
const destinations = [
	{icon: 'material-symbols:favorite', name: 'index', label: 'Posts'},
	{icon: 'material-symbols:auto-graph-rounded', name: 'stats', label: 'Stats'}
]
</script>

<template>
  <nav class="bg-surface text-on-surface flex-center gap-[40px] w-full pb-[16px] pt-[12px]">
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

