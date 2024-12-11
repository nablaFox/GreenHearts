interface CreatePostParams {}

export function usePost() {
  const error: FirebaseError = ''

  // changes are optimistically immediate; can be used for aknowledgement but not to make the user wait
  const loading = false

  const addPost = (params: CreatePostParams) => {
    // optimistic update
    // update loading, error
  }

  const votePost = (score: HeartScore, id: string) => {}

  return {
    loading,
    error,
    votePost,
    addPost
  }
}
