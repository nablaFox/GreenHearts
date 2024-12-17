import { firestore, storage } from '@/api'
import { create } from 'zustand'
import { type ActionStatus, type Post } from '@/types'
import type { FirestoreError, FirebaseStorageError } from '@/api'

type AddPostStatus = ActionStatus<
  FirestoreError | FirebaseStorageError | 'invalid-filename'
>
type FetchPostsStatus = ActionStatus<'error-1'>

interface CreatePostParams {
  title?: string
  notes?: string
  imageUri?: string
  date?: Date
}

interface PostsStoreState {
  posts: Post[]
  fetchPostsStatus: FetchPostsStatus
  fetchMorePostsStatus: FetchPostsStatus
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
  fetchPostsStatus: 'loading',
  fetchMorePostsStatus: 'success',
  addPostStatus: 'success',
  firebaseCallback: null,
  postsLimit: 10,

  fetchPosts: (bunnyId: string) => {
    get().firebaseCallback?.()

    set({ fetchPostsStatus: 'loading' })

    const unsubscribe = firestore
      .posts({ userId: bunnyId })
      .orderBy('userDate', 'desc')
      .limit(get().postsLimit)
      .onSnapshot(snapshot => {
        let lastDate = new Date()

        const posts: Post[] = snapshot.docs.map(doc => {
          const data = doc.data()
          const userDate = data.userDate?.toDate()
          const isHeader = userDate && lastDate.getDate() !== userDate.getDate()

          if (isHeader) lastDate = userDate

          return { ...data, key: doc.id, isHeader }
        })

        set({ posts })

        if (get().fetchPostsStatus === 'loading') {
          set({ fetchPostsStatus: 'success' })
        }

        set({ fetchMorePostsStatus: 'success' })
      })

    set({ firebaseCallback: unsubscribe })
  },

  fetchMorePosts: (bunnyId: string, num?: number) => {
    set({ fetchMorePostsStatus: 'loading' })

    const postsLimit = get().postsLimit
    const incrementedLimit = num || postsLimit + 10

    set({ postsLimit: incrementedLimit })
    get().fetchPosts(bunnyId)
  },

  addPost: async (bunnyId: string, params: CreatePostParams) => {
    set({ addPostStatus: 'loading' })

    let url: string | null = null

    if (params.imageUri) {
      const fileName = params.imageUri.split('/').pop()

      if (!fileName) {
        set({ addPostStatus: 'invalid-filename' })
        return
      }

      const postStorageRef = storage.posts({ userId: bunnyId, fileName })

      await postStorageRef.putFile(params.imageUri).catch((e: any) => {
        const code = e?.code as FirebaseStorageError
        set({ addPostStatus: code })
      })

      const downloadUrl = await postStorageRef
        .getDownloadURL()
        .catch((e: any) => {
          const code = e?.code as FirebaseStorageError
          set({ addPostStatus: code })
          return null
        })

      if (downloadUrl === null) return

      url = downloadUrl
    }

    const res = await firestore
      .posts({ userId: bunnyId })
      .add({
        title: params.title,
        notes: params.notes,
        image: url ?? undefined,
        date: firestore.Timestamp.now(),
        userDate: firestore.Timestamp.fromDate(params.date || new Date())
      })
      .catch((e: any) => {
        const code = e?.code as FirestoreError
        set({ addPostStatus: code })
        return null
      })

    if (res !== null) set({ addPostStatus: 'success' })
  },

  getPost: (id: string) => {
    return get().posts.find(post => post.key === id)
  }
}))
