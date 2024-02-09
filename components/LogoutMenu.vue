<script setup lang="ts">
import '@material/web/iconbutton/icon-button.js'
import '@material/web/iconbutton/filled-tonal-icon-button.js'
import '@material/web/menu/menu.js'

const menu = ref<HTMLElement | null>(null)
const auth = useFirebaseAuth()

function onClick() {
	auth?.signOut()
	useRouter().push('/login')
}
</script>

<template>
  <md-icon-button
    id="usage-anchor"
    ref="btn"
    class="mt-2 z-[100] self-end"
    @click="menu!.open = !menu.open"
  >
    <Icon
      name="ic:round-more-vert"
      size="24"
    />
  </md-icon-button>
  <md-menu
    ref="menu"
    anchor="usage-anchor" 
    menu-corner="BOTTOM_END"
    y-offset="60"
    x-offset="-20"
  >
    <md-menu-item class="font-bold text-sm cursor-pointer">
      <div
        slot="headline"
        class="pl-4"
        @click="onClick"
      >
        Logout
      </div>
    </md-menu-item>
  </md-menu>
</template>

