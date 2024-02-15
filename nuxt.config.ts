// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	ssr: false,

	vue: {
		compilerOptions: {
			isCustomElement: tag => tag.startsWith('md')
		}
	},

	css: ['@/assets/css/theme.css'],

	modules: [
		'@nuxtjs/tailwindcss', 
		'@nuxt/image', 
		'@vueuse/nuxt', 
		'@nuxtjs/google-fonts',
		'nuxt-vuefire', 
		'nuxt-icon'
	],

	googleFonts: {
		families: {
			 Inter: true,
			 Montserrat: '100..900',
			 Pacifico: true,
		}
	},

	runtimeConfig: {
		public: {
			privateUser: process.env.PRIVATE_USER,
		},

		firebaseAdminCredentials: {
			projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
			privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, '\n'),
			clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
			type: process.env.FIREBASE_ADMIN_TYPE,
			privateKeyId: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
			authUri: process.env.FIREBASE_ADMIN_AUTH_URI,
			tokenUri: process.env.FIREBASE_ADMIN_TOKEN_URI,
			authProviderX509CertUrl: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
			clientX509CertUrl: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
		}
	},

	vuefire: {
		auth: {
			enabled: true,
		},

		emulators: {
			auth: {
				options: {
					disableWarnings: true
				}
			}
		},
		config: {
			apiKey: 'AIzaSyByZIB5CLkAsFlCsih_uc8zsyACBtV3Po8',
			authDomain: 'peyton-9dfe4.firebaseapp.com',
			projectId: 'peyton-9dfe4',
			storageBucket: 'peyton-9dfe4.appspot.com',
			messagingSenderId: '948982701209',
			appId: '1:948982701209:web:40a0f4356ba2d7c2006c08',
			measurementId: 'G-7LDL7ZD29H'
		}
	},

	tailwindcss: {
		exposeConfig: true
	}
})
