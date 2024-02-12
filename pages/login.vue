<script setup lang="ts">
import '@material/web/button/outlined-button.js'
const { login } = usePrivate()

const loginSuccess = ref(true)

async function onLogin() {
	loginSuccess.value = await login()
	setTimeout(() => (loginSuccess.value = true), 10)
	loginSuccess.value && useRouter().push('/')
}
</script>

<template>
  <div class="flex flex-col items-center h-[100svh]">
    <img
      src="/blob-scatter.svg"
      class="abs-center -z-1"
    >
    <LoginMenu
      class="h-full"
      @login="onLogin"
    />

    <WarningBox
      :error="!loginSuccess"
      text="Login Failed 😟"
    />

    <GitSignature
      text="Created With ❥"
      class="absolute bottom-4 text-on-surface-variant"
    />
  </div>
</template>

