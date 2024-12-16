import { getWeek } from 'date-fns'

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

      return `users/{userId}/stats/${year}-${month}-${day}`
    },
    params: {} as { userId: string },
    docType: {} as Stats,
    type: 'doc'
  },

  thisWeekStats: {
    path: () => {
      const today = new Date()
      const week = getWeek(today)
      const year = today.getFullYear()

      return `users/{userId}/stats/${year}-${week}`
    },
    params: {} as { userId: string },
    docType: {} as Stats,
    type: 'doc'
  },

  thisMonthStats: {
    path: () => {
      const today = new Date()
      const month = today.getMonth() + 1
      const year = today.getFullYear()

      return `users/{userId}/stats/${year}-${month}`
    },
    params: {} as { userId: string },
    docType: {} as Stats,
    type: 'doc'
  }
}

export default FirestoreContract
