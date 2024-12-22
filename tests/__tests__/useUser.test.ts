import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuthUserId } from '@/libs/nativeAuth'
import { firestore } from '@/api'
import { useUser } from '@/hooks/useUser'
import { renderHook, act } from '@testing-library/react-native'
import { UserInDatabase } from '@/types'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn().mockResolvedValue(null),
  getItem: jest.fn().mockResolvedValue(null)
}))

jest.mock('@/libs/nativeAuth', () => ({ getAuthUserId: jest.fn() }))
jest.mock('@/api', () => ({ firestore: { user: jest.fn() } }))

const setupFirestoreUserGetMock = ({
  exists,
  ...userData
}: {
  exists: boolean
} & Partial<UserInDatabase>) => {
  ;(firestore.user as jest.Mock).mockReturnValue({
    get: jest.fn().mockResolvedValue({
      exists,
      data: jest.fn().mockReturnValue(userData || {})
    }),
    onSnapshot: jest.fn()
  })
}

const setupGetAuthUserIdMock = ({ userId }: { userId?: string }) => {
  ;(getAuthUserId as jest.Mock).mockReturnValue(userId)
}

const setupAsyncStorageGetItemMock = (value?: string) => {
  ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(value)
}

describe('useUser store', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useUser.getState().reset()
  })

  const getUseUser = () => renderHook(() => useUser()).result

  it('has the correct initial state', () => {
    const { bunnyId, user, fetchUserStatus } = getUseUser().current

    expect(bunnyId).toBeNull()
    expect(user).toBeNull()
    expect(fetchUserStatus).toBe('idle')
  })

  describe('fetchUser', () => {
    const fetchUser = async () => {
      const fetch = getUseUser().current.fetchAuthUser
      await act(async () => await fetch())
    }

    const fetchUserAndGetState = async () => {
      const result = getUseUser()
      await fetchUser()
      return result.current
    }

    describe('unsuccesful fetch', () => {
      it('does not call setFirebaseCallback', async () => {
        const userState = getUseUser()

        expect(userState.current.firebaseSubscriber).toBeNull()

        const spyOn = jest.spyOn(userState.current, 'fetchBunny')

        await fetchUser()

        expect(spyOn).not.toHaveBeenCalled()
        expect(userState.current.firebaseSubscriber).toBeNull()
      })

      it('does not set fetchUserStatus not to "success" or "loading"', async () => {
        const { fetchUserStatus } = await fetchUserAndGetState()
        expect(fetchUserStatus).not.toBe('success')
        expect(fetchUserStatus).not.toBe('loading')
      })

      describe('user is not authenticated', () => {
        beforeEach(() => {
          setupGetAuthUserIdMock({ userId: undefined })
        })

        it('sets fetchUserStatus to "firestore/permission-denied"', async () => {
          const { fetchUserStatus } = await fetchUserAndGetState()
          expect(fetchUserStatus).toBe('firestore/permission-denied')
        })
      })

      describe('user is not found', () => {
        beforeEach(() => {
          setupGetAuthUserIdMock({ userId: 'userId' })
          setupFirestoreUserGetMock({ exists: false })
        })

        it('sets fetchUserStatus to "firestore/not-found"', async () => {
          const { fetchUserStatus } = await fetchUserAndGetState()
          expect(fetchUserStatus).toBe('firestore/not-found')
        })
      })
    })

    describe('successful fetch', () => {
      const authUserId = 'userId'

      beforeEach(() => {
        setupGetAuthUserIdMock({ userId: authUserId })
        setupFirestoreUserGetMock({ exists: true })
      })

      const validateSuccessfulFetch = async () => {
        const { fetchUserStatus, user } = getUseUser().current
        expect(fetchUserStatus).toBe('success')
        expect(user).not.toBeNull()
      }

      afterEach(async () => {
        await validateSuccessfulFetch()
      })

      it('makes isLogged true', async () => {
        const { fetchUserStatus } = await fetchUserAndGetState()
        expect(fetchUserStatus).toBe('success')
      })

      describe('user is not owl', () => {
        beforeEach(() =>
          setupFirestoreUserGetMock({ exists: true, isOwl: false })
        )

        it('sets bunnyId to authUserId', async () => {
          const { bunnyId } = await fetchUserAndGetState()
          expect(bunnyId).toBe(authUserId)
        })

        it('does not call AsyncStorage.getItem', async () => {
          await fetchUser()
          expect(AsyncStorage.getItem).not.toHaveBeenCalled()
        })

        it('does not call AsyncStorage.setItem', async () => {
          await fetchUser()
          expect(AsyncStorage.setItem).not.toHaveBeenCalled()
        })
      })

      describe('user is owl', () => {
        beforeEach(() => {
          setupFirestoreUserGetMock({ exists: true, isOwl: true })
        })

        it('calls AsyncStorage.getItem', async () => {
          await fetchUser()
          expect(AsyncStorage.getItem).toHaveBeenCalledWith('bunnyId')
        })

        describe('bunnyId is stored', () => {
          const testBunnyId = 'bunnyId123'

          beforeEach(() => {
            setupAsyncStorageGetItemMock(testBunnyId)
          })

          it('sets bunnyId to stored bunnyId', async () => {
            const { bunnyId } = await fetchUserAndGetState()
            expect(bunnyId).toBe(testBunnyId)
          })

          it('calls AsyncStorage.setItem', async () => {
            await fetchUser()
            expect(AsyncStorage.setItem).toHaveBeenCalledWith(
              'bunnyId',
              testBunnyId
            )
          })
        })

        describe('bunnyId is not stored', () => {
          beforeEach(() => {
            setupAsyncStorageGetItemMock(undefined)
          })

          it('does not call AsyncStorage.setItem', async () => {
            await fetchUser()
            expect(AsyncStorage.setItem).not.toHaveBeenCalled()
          })

          it('does not set bunnyId', async () => {
            const { bunnyId } = await fetchUserAndGetState()
            expect(bunnyId).toBeNull()
          })
        })
      })
    })
  })
})
