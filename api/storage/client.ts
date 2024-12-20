import storage from '@react-native-firebase/storage'
import { createStorageClient } from '@/libs/firebaseClient'
import contract from './contract'

const client = createStorageClient(contract)

if (__DEV__) {
  storage().useEmulator('192.168.1.100', 9199)
}

export default client
