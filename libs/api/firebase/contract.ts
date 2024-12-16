const FirestoreContract = {
  user: {
    path: '/users/{userId}',
    params: {} as { userId: string },
    docType: {} as User,
    type: 'doc'
  },
  posts: {
    path: '/users/{userId}/posts',
    params: {} as { userId: string },
    docType: {} as Post,
    type: 'collection'
  },
  post: {
    path: '/users/{userId}/posts/{postId}',
    params: {} as { userId: string; postId: string },
    docType: {} as Post,
    type: 'doc'
  },
  dailyStats: {
    path: `/users/{userId}/stats/{year}-{month}-{day}`,
    params: {} as { userId: string; year: number; month: number; day: number },
    docType: {} as Stats,
    type: 'doc'
  },
  monthlyStats: {
    path: `/users/{userId}/stats/{year}-{month}`,
    params: {} as { userId: string; year: number; month: number }
  },
  weeklyStats: {
    path: `/users/{userId}/stats/{year}-{week}`,
    params: {} as { userId: string; year: number; week: number }
  }
}

export default FirestoreContract
