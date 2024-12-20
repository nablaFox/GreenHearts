import { firestore } from '@/api'
import { usePosts } from '@/hooks/usePosts'
import type { PostInDatabase } from '@/types'
import { act, renderHook } from '@testing-library/react-native'

jest.mock('@/api', () => ({
  firestore: {
    posts: jest.fn().mockReturnValue({
      onSnapshot: jest.fn().mockReturnValue(jest.fn()),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis()
    })
  }
}))

const setupSuccessfulPostsSnapshot = (
  data: PostInDatabase & { id: string }[]
) => {
  ;(firestore.posts as jest.Mock).mockReturnValue({
    onSnapshot: jest.fn().mockImplementation(callback => {
      const snapshot = {
        docs: data.map(post => ({ data: () => post, id: post.id }))
      }

      callback(snapshot)
    }),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis()
  })
}

const setupUnsuccessfulPostsSnapshot = (error: any) => {}

const generatePost = ({
  id,
  title,
  image,
  description,
  dayFromNow
}: {
  id: string
  dayFromNow: number
  title?: string
  image?: string
  description?: string
}) => {
  return {
    id,
    title: title || `Post ${id}`,
    image: image || `image post ${id}`,
    userDate: {
      toDate: () => new Date(Date.now() + dayFromNow * 24 * 60 * 60 * 1000)
    },
    description: description || `description post ${id}`
  }
}

describe('usePosts store', () => {
  const getUsePosts = () => renderHook(() => usePosts()).result

  beforeEach(() => {
    jest.clearAllMocks()
    usePosts.setState({
      posts: [],
      fetchPostsStatus: 'idle',
      fetchMorePostsStatus: 'idle',
      addPostStatus: 'idle',
      postsLimit: 10
    })
  })

  it('has the correct initial state', () => {
    const {
      posts,
      fetchPostsStatus,
      fetchMorePostsStatus,
      addPostStatus,
      postsLimit,
      firebaseCallback
    } = getUsePosts().current

    expect(posts).toEqual([])
    expect(fetchPostsStatus).toBe('idle')
    expect(fetchMorePostsStatus).toBe('idle')
    expect(addPostStatus).toBe('idle')
    expect(postsLimit).toBe(10)
    expect(firebaseCallback).toBeNull()
  })

  describe('fetchPosts', () => {
    const fetchPosts = (bunnyId: string) => {
      const fetch = getUsePosts().current.fetchPosts
      act(() => fetch(bunnyId))
    }

    const fetchPostsAndGetState = (bunnyId: string) => {
      const result = getUsePosts()
      fetchPosts(bunnyId)
      return result.current
    }

    describe('not the first fetch', () => {
      beforeEach(() => {
        usePosts.setState({ firebaseCallback: jest.fn() })
      })

      it('unsubscribes the previous firebase listener', () => {
        const { firebaseCallback } = getUsePosts().current

        fetchPosts('bunnyId')

        expect(firebaseCallback).toHaveBeenCalled()
      })
    })

    it('sets fetchPostsStatus to loading', () => {
      const { fetchPostsStatus } = fetchPostsAndGetState('bunnyId')
      expect(fetchPostsStatus).toBe('loading')
    })

    it('sets the firebase listener unsubscribe function', () => {
      const { firebaseCallback } = fetchPostsAndGetState('bunnyId')
      expect(firebaseCallback).not.toBeNull()
    })

    it('sets the correct posts', () => {
      const testPosts = [
        generatePost({ id: '1', dayFromNow: 1 }),
        generatePost({ id: '2', dayFromNow: 2 }),
        generatePost({ id: '3', dayFromNow: 2 })
      ]

      setupSuccessfulPostsSnapshot(testPosts)

      fetchPosts('bunnyId')

      const { posts } = getUsePosts().current

      expect(posts).toEqual([
        { ...testPosts[0], isHeader: true, key: '1' },
        { ...testPosts[1], isHeader: true, key: '2' },
        { ...testPosts[2], isHeader: false, key: '3' }
      ])
    })
  })

  describe('fetchMorePosts', () => {
    it('increments the postsLimit', () => {})

    it('calls fetchPosts with the incremented postsLimit', () => {})

    it('sets fetchMorePostsStatus to loading', () => {})

    it('sets fetchMorePostsStatus to success', () => {})

    it('does not modify fetchPostsStatus', () => {})
  })

  describe('addPost', () => {})
})
