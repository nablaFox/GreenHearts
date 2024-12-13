import { useState } from 'react'

interface PostsByDay {
  date: Date
  data: Post[]
}

export function usePosts() {
  const posts: Post[] = []
  const postsByDay: PostsByDay[] = []

  const fetchPostsStatus = useState<FetchPostsStatus>('loading')[0]
  const fetchMorePostsStatus = useState<FetchPostsStatus>('loading')[0]

  const fetchPosts = () => {
    // set fetchPostsStatus to loading
    // set firebase callback by fetching posts in descending date order with postsLimit:
    // - if unverified product exists with same key replace it
    // - set fetchPostsStatus to success if it is false at the end of the loop
    // - if fetchPostsStatus is "success" set fetchMoreStatus to success
  }

  const fetchMorePosts = (num?: number) => {
    // set fetchMoreStatus to loading
    // increase postsLimit by num
  }

  const addPost = async (params: CreatePostParams): Promise<VotePostStatus> => {
    // set addStatus to loading
    // optimistic update
    // send request to server
    // if request failed set addStatus to error and remove the added post

    return 'success'
  }

  const votePost = async (
    score: HeartScore,
    id: string
  ): Promise<AddPostStatus> => {
    // no need to check if it is admin the server will do that
    // store backup of the post
    // set voteStatus to loading
    // optimistic update
    // send request to server
    // if request failed set voteStatus to error and restore the post

    return 'success'
  }

  const getPost = (id: string) => {}

  return {
    posts,
    postsByDay,
    fetchPostsStatus,
    fetchMorePostsStatus,
    fetchPosts,
    fetchMorePosts,
    votePost,
    addPost,
    getPost
  }
}

