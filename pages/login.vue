<script lang="ts">
import {GoogleAuthProvider} from 'firebase/auth'
export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script setup lang="ts">
import '@material/web/button/outlined-button.js'
import {
	signInWithPopup,
	type Auth
} from 'firebase/auth'
import {useFirebaseAuth} from 'vuefire'

definePageMeta({
	layout: false
})

const auth = useFirebaseAuth() as Auth

async function login() {
	await signInWithPopup(auth, googleAuthProvider).catch(err => console.error(err))
	useRouter().push('/')
}

const loginFailed = useState<boolean | undefined>('login-failed')
</script>

<template>
  <div class="flex flex-col items-center h-[100svh]">
    <img
      src="/blob-scatter.svg"
      class="abs-center -z-1"
    >
    <LoginMenu
      class="h-full"
      @login="login"
    />

    <WarningBox
      :visible="loginFailed || false"
      text="Login Failed. Don't try again!"
      class="absolute bottom-20"
    />

    <GitSignature
      text="Created With ❥"
      class="absolute bottom-4 text-on-surface-variant"
    />
  </div>
</template>

