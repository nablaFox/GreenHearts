const StorageContract = {
  posts: {
    path: 'posts/{userId}/{fileName}',
    params: {} as { userId: string; fileName: string }
  }
}

export default StorageContract
