<script setup lang="ts">
defineProps<{
	date?: string
}>()
	
</script>

<template>
  <div class="bg-red-100">
    <svg
      _ngcontent-kod-c25=""
      aria-hidden="true"
      width="155"
      height="9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="ng-tns-c25-51"
    >
      <path
        _ngcontent-kod-c25=""
        d="M1.5 4.5c5.067-4.667 10.133-4.667 15.2 0s10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0"
        stroke="var(--md-sys-color-primary)"
        stroke-width="2.2"
        stroke-linecap="round"
        class="ng-tns-c25-51"
      />
    </svg>
    <span 
      class="font-extrabold text-sm abs-center-y -right-[65%] text-primary font-black"
    > 
      {{ date }} 
    </span>
  </div>
</template>

