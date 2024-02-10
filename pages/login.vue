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

const auth = useFirebaseAuth() as Auth

async function login() {
	const { user } = (await signInWithPopup(auth, googleAuthProvider))
	user && useRouter().push('/app')	
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
      :error="loginFailed || false"
      text="Login Failed 💥"
      class="absolute bottom-20"
    />

    <GitSignature
      text="Created With ❥"
      class="absolute bottom-4 text-on-surface-variant"
    />
  </div>
</template>

