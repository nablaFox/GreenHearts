const FirestoreContract = {
  user: {
    path: '/users/{key}',
    params: {} as { key: string },
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
    path: `/users/{userId}/stats/{date}`,
    params: {} as { userId: string; date: `${number}-${number}-${number}` },
    docType: {} as Stats,
    type: 'doc'
  }
}

export default FirestoreContract
