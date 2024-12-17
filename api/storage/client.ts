import { createStorageClient } from '@/libs/firebaseClient'
import contract from './contract'

const client = createStorageClient(contract)

export default client
