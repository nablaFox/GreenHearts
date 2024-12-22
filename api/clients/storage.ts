import Storage from '@react-native-firebase/storage'
import { createStorageClient } from '@/libs/firebaseClient'

const contract = {
  posts: {
    path: 'posts/{userId}/{fileName}',
    params: {} as { userId: string; fileName: string }
  }
}

if (__DEV__) {
  Storage().useEmulator(
    process.env.EXPO_PUBLIC_STORAGE_EMULATOR_HOST!,
    parseInt(process.env.EXPO_PUBLIC_STORAGE_EMULATOR_PORT!)
  )
}

export const storage = createStorageClient(contract)
