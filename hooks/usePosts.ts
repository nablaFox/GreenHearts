import { firestore } from '@/api'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { create } from 'zustand'

interface PostsByDay {
  date: Date
  data: Post[]
}

type VotePostResult = ActionResult<'error-1' | 'error-2' | 'error-3'>
type AddPostStatus = ActionStatus<'firebase-error'>
type FetchPostsStatus = ActionStatus<'error-1'>

interface CreatePostParams {
  title?: string
  notes?: string
  imageUri?: string
  date?: FirebaseFirestoreTypes.Timestamp
}

interface PostsStoreState {
  posts: Post[]
  fetchPostsStatus: FetchPostsStatus
  fetchMorePostsStatus: FetchPostsStatus
  addPostStatus: AddPostStatus
  postsLimit: number
  bunnyId: string

  firebaseCallback: (() => void) | null
  fetchPosts: (bunnyId: string) => void
  fetchMorePosts: (num?: number) => void
  addPost: (params: CreatePostParams) => void
  votePost: (heart: Heart, id: string) => Promise<VotePostResult>
  getPost: (id: string) => void
  postsByDay: () => PostsByDay[]
}

export const usePosts = create<PostsStoreState>((set, get) => ({
  posts: [],
  fetchPostsStatus: 'loading',
  fetchMorePostsStatus: 'success',
  addPostStatus: 'success',
  firebaseCallback: null,
  postsLimit: 10,
  bunnyId: '',

  fetchPosts: (bunnyId: string) => {
    get().firebaseCallback?.()

    set({ fetchPostsStatus: 'loading' })
    set({ bunnyId })

    const unsubscribe = firestore
      .posts({ userId: bunnyId })
      .orderBy('date', 'desc')
      .limit(get().postsLimit)
      .onSnapshot(doc => {
        const posts: Post[] = []

        doc.forEach(post => {
          const data = post.data()
          const key = post.id

          posts.push({ ...data, key })
        })

        set({ posts })

        if (get().fetchPostsStatus === 'loading') {
          set({ fetchPostsStatus: 'success' })
        }

        set({ fetchMorePostsStatus: 'success' })
      })

    set({ firebaseCallback: unsubscribe })
  },

  fetchMorePosts: (num?: number) => {
    set({ fetchMorePostsStatus: 'loading' })

    const postsLimit = get().postsLimit
    const incrementedLimit = num || postsLimit + 10

    set({ postsLimit: incrementedLimit })
    get().fetchPosts(get().bunnyId)
  },

  addPost: async (params: CreatePostParams) => {
    set({ addPostStatus: 'loading' })

    const res = await firestore
      .posts({ userId: get().bunnyId })
      .add(params)
      .catch(() => null)

    if (!res) {
      set({ addPostStatus: 'firebase-error' })
      return
    }

    set({ addPostStatus: 'success' })
  },

  votePost: async (heart: Heart, id: string) => {
    const bunnyId = get().bunnyId

    try {
      await firestore
        .post({ userId: get().bunnyId, postId: id })
        .update({ heart })

      firestore.todayStats({ userId: bunnyId }).update({
        score: firestore.FieldValue.increment(heart)
      })

      firestore.thisWeekStats({ userId: bunnyId }).update({
        score: firestore.FieldValue.increment(heart)
      })

      firestore.thisMonthStats({ userId: bunnyId }).update({
        score: firestore.FieldValue.increment(heart)
      })
    } catch (e) {
      return 'error-1'
    }
  },

  getPost: (id: string) => {
    return get().posts.find(post => post.key === id)
  },

  postsByDay: () => {
    const posts = get().posts

    const postsByDayMap = new Map<string, { date: Date; data: Post[] }>()

    posts.forEach(post => {
      const date = post.date?.toDate()

      if (!date) return

      const dateKey = date.toDateString()

      if (!postsByDayMap.has(dateKey)) {
        postsByDayMap.set(dateKey, { date, data: [post] })
      } else {
        postsByDayMap.get(dateKey)?.data.push(post)
      }
    })

    return Array.from(postsByDayMap.values())
  }
}))
