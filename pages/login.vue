<script setup lang="ts">
import '@material/web/button/outlined-button.js'
const { login } = useUser()

const loginError = ref('')
const adminClaim = ref(false)

async function onLogin() {
	const { error } = await login(adminClaim.value)
	error && (loginError.value = error)
	!loginError.value && useRouter().push('/')
}

let count = 0
let timer: NodeJS.Timeout
function setAdminClaim() {
	clearTimeout(timer)
	count++

	if (count >= 3) {
		adminClaim.value = true
		console.log('Admin claim set')
		count = 0
	}

	timer = setTimeout(() => (count =  0), 500)
}
</script>

<template>
  <div class="flex flex-col items-center h-[100svh]">
    <LoginMenu
      class="h-full"
      @login="onLogin"
    />

    <WarningBox
      v-model="loginError"
      :text="loginError"
    />

    <GitSignature
      text="Created With ❥"
      class="absolute bottom-4 text-on-surface-variant"
      @click="setAdminClaim"
    />
  </div>
</template>

