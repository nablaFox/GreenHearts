import { create } from 'zustand'
import { firestore } from '@/api'

interface StatsStoreState {
  thisMonthStats: Stats
  thisWeekStats: Stats
  todayStats: Stats
  fetchStats: (bunnyId: string) => void
  prevCallback: (() => void)[] | null
}

const defaultStats: Stats = {
  meals: 0,
  kcal: 0,
  workouts: 0,
  score: 0,
  greens: 0,
  reds: 0,
  blue: 0,
  grays: 0
}

export const useStats = create<StatsStoreState>((set, get) => ({
  thisMonthStats: defaultStats,
  thisWeekStats: defaultStats,
  todayStats: defaultStats,
  prevCallback: null,

  fetchStats: (bunnyId: string) => {
    get().prevCallback?.forEach(cb => cb())

    const unsubscribeToday = firestore
      .todayStats({ userId: bunnyId })
      .onSnapshot(doc => {
        const data = doc?.data()

        if (!data) return

        set({ todayStats: data })
      })

    const unsubscribeWeek = firestore
      .thisWeekStats({ userId: bunnyId })
      .onSnapshot(doc => {
        const data = doc?.data()

        if (!data) return

        set({ thisWeekStats: data })
      })

    const unsubscribeMonth = firestore
      .thisMonthStats({ userId: bunnyId })
      .onSnapshot(doc => {
        const data = doc?.data()

        if (!data) return

        set({ thisMonthStats: data })
      })

    set({ prevCallback: [unsubscribeToday, unsubscribeWeek, unsubscribeMonth] })
  }
}))
