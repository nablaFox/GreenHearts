import { create } from 'zustand'
import { firestore } from '@/libs/api'
import { getWeek } from 'date-fns'

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

    const today = new Date()
    const day = today.getDate()
    const week = getWeek(today)
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    const unsubscribeToday = firestore
      .dailyStats({ userId: bunnyId, year, month, day })
      .onSnapshot(doc => {
        const data = doc?.data()

        if (!data) return

        set({ todayStats: data })
      })

    const unsubscribeWeek = firestore
      .weeklyStats({ userId: bunnyId, year, week })
      .onSnapshot(doc => {
        const data = doc?.data()

        if (!data) return

        set({ thisWeekStats: data })
      })

    const unsubscribeMonth = firestore
      .monthlyStats({ userId: bunnyId, year, month })
      .onSnapshot(doc => {
        const data = doc?.data()

        if (!data) return

        set({ thisMonthStats: data })
      })

    set({ prevCallback: [unsubscribeToday, unsubscribeWeek, unsubscribeMonth] })
  }
}))
