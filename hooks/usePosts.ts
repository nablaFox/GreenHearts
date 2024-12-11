interface PostsByDay {
  date: Date
  data: Post[]
}

export function usePosts() {
  const posts: Post[] = []
  const postsByDay: PostsByDay[] = [] // should be a computed
  const fetchPostsStatus: APIStatus = 'success'
  const updatePostStatus: APIStatus = 'success'

  const postsLimit = 10

  const fetchPosts = () => {
    // set firebase callback by fetching posts in descending date order with postsLimit:
    // - if unverified product exists with same key and same status as change.type mark the product as verified
    // - set updatePostStatus to success within each doc.change()
    // - set fetchPostsStatus to success after all docs are processed
    //
    // on firebase error:
    // - set fetchPostsStatus to the firebase error
    //
    // set a watcher on updatePostStatus; if there is an error remove all unverified posts related to the error
  }

  const fetchMorePosts = (num?: number) => {
    // increase postsLimit by num
    // set fetchPostsStatus to loading
  }

  const deletePost = (id: string) => {}

  const votePost = (score: HeartScore, id: string) => {
    // set updatePostStatus to loading
    // optimistic update
    // send request to server
    // if request failed set updatePostStatus to error
  }

  const editPost = (id: string, params: CreatePostParams) => {}

  const addPost = (params: CreatePostParams) => {}

  return {
    posts,
    postsByDay,
    fetchPostsStatus,
    updatePostStatus,
    postsLimit,
    setPostsStatus: () => {},
    fetchPosts,
    fetchMorePosts,
    deletePost,
    votePost,
    addPost
  }
}
