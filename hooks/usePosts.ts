import {
  addPost as addPostInFirestore,
  fetchPosts as fetchPostsInFirestore
} from '@/api/posts'
import { create } from 'zustand'
import { type ActionStatus, type Post } from '@/types'
import type { FirestoreError, FirebaseStorageError } from '@/api'

type AddPostStatus = ActionStatus<
  FirestoreError | FirebaseStorageError | 'invalid-filename'
>

type FetchPostsStatus = ActionStatus<FirestoreError>

interface CreatePostParams {
  title?: string
  notes?: string
  imageUri?: string
  date?: Date
}

interface PostsStoreState {
  posts: Post[]
  fetchPostsStatus: FetchPostsStatus
  addPostStatus: AddPostStatus
  postsLimit: number

  firebaseCallback: (() => void) | null
  fetchPosts: (bunnyId: string) => void
  fetchMorePosts: (bunnyId: string, num?: number) => void
  addPost: (bunnyId: string, params: CreatePostParams) => void
  getPost: (id: string) => void
}

export const usePosts = create<PostsStoreState>((set, get) => ({
  posts: [],
  fetchPostsStatus: 'idle',
  addPostStatus: 'idle',
  firebaseCallback: null,
  postsLimit: 10,

  fetchPosts: (bunnyId: string) => {
    get().firebaseCallback?.()

    set({ fetchPostsStatus: 'loading' })

    const unsubscribe = fetchPostsInFirestore({
      userId: bunnyId,
      limit: get().postsLimit,
      callback: posts => set({ posts, fetchPostsStatus: 'success' }),
      onError: e => set({ fetchPostsStatus: e })
    })

    set({ firebaseCallback: unsubscribe })
  },

  fetchMorePosts: (bunnyId: string, num?: number) => {
    const postsLimit = get().postsLimit
    const incrementedLimit = num || postsLimit + 10

    set({ postsLimit: incrementedLimit })
    get().fetchPosts(bunnyId)
  },

  addPost: async (bunnyId: string, params: CreatePostParams) => {
    set({ addPostStatus: 'loading' })

    const res = await addPostInFirestore(bunnyId, params)

    if (res === 'ok') set({ addPostStatus: 'success' })
    else set({ addPostStatus: res })
  },

  getPost: (id: string) => {
    return get().posts.find(post => post.key === id)
  }
}))
