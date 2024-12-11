interface PostsByDay {
  date: Date
  data: Post[]
}

export function usePosts() {
  const posts: Post[] = []
  const postsByDay: PostsByDay[] = [] // should be a computed
  const error: FirebaseError = ''
  const postsLimit = 10
  const loading = false

  const fetchPosts = () => {
    // set firebase callback
    // fetch by date descending with postsLimit
    // update error
  }

  const fetchMorePosts = (num?: number) => {}

  return {
    posts,
    postsByDay,
    error,
    loading,
    postsLimit,
    fetchPosts,
    fetchMorePosts
  }
}
