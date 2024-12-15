const FirestoreContract = {
  users: {
    path: '/users/{id}',
    params: {} as { key: string },
    docType: {} as User
  },
  posts: {
    path: '/users/{userId}/posts/{postId}',
    params: {} as { userId: string; postId: string },
    docType: {} as Post
  }
}

export default FirestoreContract
