// TODO: use firestore real error type
type Error = string

interface CreatePostParams {}

export function usePosts() {
  const posts: Post[] = []
  const error: Error = ''

  // changes are optimistically immediate; can be used for aknowledgement but not to make the user wait
  const loading = false

  const fetchPosts = () => {
    // set firebase callback
    // update error
  }

  const addPost = (params: CreatePostParams) => {
    // optimistic update
    // update loading, error
  }

  return {
    posts,
    error,
    loading,
    fetchPosts,
    addPost
  }
}
