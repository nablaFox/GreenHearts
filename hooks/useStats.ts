import { create } from 'zustand'
import { firestore } from '@/api'
import { getWeekEnds } from '@/libs/date'
import type { Stats } from '@/types'

interface StatsStoreState {
  thisMonthStats: Stats
  thisWeekStats: Stats
  todayStats: Stats
  fetchStats: (bunnyId: string) => Promise<void>
  prevCallback: (() => void) | null
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

const accumulateStats = (acc: Stats, docData: Stats): Stats => ({
  meals: acc.meals + docData.meals,
  kcal: acc.kcal + docData.kcal,
  workouts: acc.workouts + docData.workouts,
  score: acc.score + docData.score,
  greens: acc.greens + docData.greens,
  reds: acc.reds + docData.reds,
  blue: acc.blue + docData.blue,
  grays: acc.grays + docData.grays
})

export const useStats = create<StatsStoreState>((set, get) => ({
  thisMonthStats: defaultStats,
  thisWeekStats: defaultStats,
  todayStats: defaultStats,
  prevCallback: null,

  fetchStats: async (bunnyId: string) => {
    get().prevCallback?.()

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const [startOfWeek, endOfWeek] = getWeekEnds(now)

    const todayStatsRef = firestore.todayStats({ userId: bunnyId })
    const todayStatsExists = (await todayStatsRef.get()).exists

    if (!todayStatsExists) {
      todayStatsRef.set({
        ...defaultStats,
        date: firestore.Timestamp.fromDate(now)
      })
    }

    const unsubscribeToday = firestore
      .stats({ userId: bunnyId })
      .where('date', '>=', startOfMonth)
      .limit(31)
      .onSnapshot(snapshot => {
        const docs = snapshot.docs.map(doc => doc.data())

        let thisWeekStats = { ...defaultStats }
        let thisMonthStats = { ...defaultStats }
        let todayStats = { ...defaultStats }

        docs.forEach(doc => {
          const docDate = doc.date.toDate()

          thisMonthStats = accumulateStats(thisMonthStats, doc)

          if (docDate >= startOfWeek && docDate <= endOfWeek) {
            thisWeekStats = accumulateStats(thisWeekStats, doc)
          }

          if (
            docDate.getDate() === now.getDate() &&
            docDate.getMonth() === now.getMonth() &&
            docDate.getFullYear() === now.getFullYear()
          ) {
            todayStats = accumulateStats(todayStats, doc)
          }
        })

        set({ todayStats, thisWeekStats, thisMonthStats })
      })

    set({ prevCallback: unsubscribeToday })
  }
}))
