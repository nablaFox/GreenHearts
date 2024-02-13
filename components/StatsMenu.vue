<script setup lang="ts">
import '@material/web/iconbutton/icon-button.js'
import '@material/web/iconbutton/filled-tonal-icon-button.js'
import '@material/web/menu/menu.js'
import type { MdMenu } from '@material/web/menu/menu.js'

const menu = ref<MdMenu | null>(null)

function onClick() {
	usePrivate().logout()
	useRouter().push('/login')
}

const isDark = useDark({ disableTransition: false })
const toggleDark = useToggle(isDark)
</script>

<template>
  <span class="mt-2 z-[100] self-end">
    <md-icon-button
      id="usage-anchor"
      ref="btn"
      @click="menu!.open = !menu!.open"
    >
      <Icon
        name="ic:round-more-vert"
        size="24"
      />
    </md-icon-button>

    <!-- TODO: Fix this mess -->
    <md-menu
      ref="menu"
      anchor="usage-anchor" 
      anchor-corner="start-start"
      menu-corner="end-end"
      positioning="popover"
      x-offset="-15"
    >
      <md-menu-item class="font-bold text-sm cursor-pointer">
        <div
          slot="headline"
          class="pl-4 items-start flex flex-col gap-2 w-full"
        >
          <div
            class="flex items-center gap-1 w-full"
            @click="onClick"
          >
            <Icon
              name="ic:round-logout"
              size="20"
            />	
            Logout
          </div>
          <div
            class="flex items-center gap-1 w-full"
            @click="toggleDark()"
          >
            <Icon
              :name="isDark ? 'ic:round-light-mode' : 'ic:round-dark-mode'"
              size="20"
            />	
            {{ isDark ? 'Light' : 'Dark' }}
          </div>
        </div>
      </md-menu-item>
    </md-menu>
  </span>
</template>

<style scoped>
md-menu-item:deep(div[slot="headline"]) {
	color: var(--md-sys-color-on-surface);
}
</style>
