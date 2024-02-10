// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {enabled: false},
	ssr: false,

	vue: {
		compilerOptions: {
			isCustomElement: tag => tag.startsWith('md')
		}
	},

	css: ['@/assets/css/theme.css'],

	modules: ['@nuxtjs/tailwindcss', 'nuxt-vuefire', 'nuxt-icon', "@nuxt/image", "@vueuse/nuxt", "@nuxtjs/google-fonts"],

	googleFonts: {
		families: {
			 Inter: true,
			 Montserrat: '100..900',
			 Pacifico: true,
		}
	},

	vuefire: {
		auth: {
			enabled: true,
		},

		config: {
			apiKey: "AIzaSyByZIB5CLkAsFlCsih_uc8zsyACBtV3Po8",
			authDomain: "peyton-9dfe4.firebaseapp.com",
			projectId: "peyton-9dfe4",
			storageBucket: "peyton-9dfe4.appspot.com",
			messagingSenderId: "948982701209",
			appId: "1:948982701209:web:40a0f4356ba2d7c2006c08",
			measurementId: "G-7LDL7ZD29H"
		}
	},

	tailwindcss: {
		exposeConfig: true
	}
})
