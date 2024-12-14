import auth from '@react-native-firebase/auth'
import contract from './contract'
import { initClient } from '@ts-rest/core'

const client = initClient(contract, {
  baseUrl: 'https://something.vercel.app',
  baseHeaders: {
    Authorization: () => {
      const user = auth().currentUser
      return user ? `Bearer ${user.getIdToken()}` : ''
    },
    'Content-Type': 'application/json'
  }
})

export default client
