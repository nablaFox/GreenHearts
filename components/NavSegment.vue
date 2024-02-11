<script lang="ts" setup>
defineProps<{
	icon?: string,
	label?: string,
	name?: string,
	circular?: boolean
}>()

defineEmits(['select'])
</script>

<template>
  <div class="segment flex-center flex-col gap-[4px] text-on-surface-variant">
    <RouterLink
      :to="{ name }"
      class="segment-btn overflow-hidden rounded-[16px] px-5 py-1 text"
      @click="$emit('select')"
    >
      <Icon
        :name="icon || ''"
        size="21"
      />
    </RouterLink>

    <div
      v-if="label"
      class="font-bold text-sm"
    >
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.active .segment-btn {
	background-color: var(--md-sys-color-secondary-container) !important;
	color: var(--md-sys-color-on-secondary-container) !important;
}
</style>

