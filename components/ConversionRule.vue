<script setup lang="ts">	
defineProps<{
	negative?: boolean
}>()
</script>

<template>
  <div class="rounded-sm text-xl flex-center text-on-surface-variant">
    <GlowIcon
      :color="negative ? 'red' : 'green'"
      color-modifier="500"
      name="ic:round-favorite"
      size="22"
    />
    <div class="w-10 h-8 text-on-surface-variant">
      <Icon
        name="ic:round-compare-arrows"
        size="32"
      />
      <span class="font-black text-sm absolute right-2 bottom-0">
        {{ negative ? '-2' : '4' }}
      </span>
    </div>
    <GlowIcon
      color-modifier="500"
      :color="negative ? 'green' : 'blue'"
      name="ic:round-favorite"
      class="ml-1"
      :class="{ '!ml-0': negative }"
      size="22"
    />
  </div>
</template>
