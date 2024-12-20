import Storage from '@react-native-firebase/storage'
import { createStorageClient } from '@/libs/firebaseClient'

const contract = {
  posts: {
    path: 'posts/{userId}/{fileName}',
    params: {} as { userId: string; fileName: string }
  }
}

if (__DEV__) {
  Storage().useEmulator('192.168.1.100', 9199)
}

export const storage = createStorageClient(contract)
