import type { UserInDatabase, PostInDatabase, StatsInDatabase } from '@/types'

const FirestoreContract = {
  user: {
    path: 'users/{userId}',
    params: {} as { userId: string },
    docType: {} as UserInDatabase,
    type: 'doc'
  },
  posts: {
    path: 'users/{userId}/posts',
    params: {} as { userId: string },
    docType: {} as PostInDatabase,
    type: 'coll'
  },
  post: {
    path: 'users/{userId}/posts/{postId}',
    params: {} as { userId: string; postId: string },
    docType: {} as PostInDatabase,
    type: 'doc'
  },

  todayStats: {
    path: () => {
      const today = new Date()
      const day = today.getDate()
      const month = today.getMonth() + 1
      const year = today.getFullYear()

      return `users/{userId}/stats/${year}${month}${day}`
    },
    params: {} as { userId: string },
    docType: {} as StatsInDatabase,
    type: 'doc'
  },

  stats: {
    path: 'users/{userId}/stats',
    params: {} as { userId: string },
    docType: {} as StatsInDatabase,
    type: 'doc'
  }
}

export default FirestoreContract
