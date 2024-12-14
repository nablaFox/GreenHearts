interface Stats {
  meals: number
  kcal: number
  workouts: number
  score: number
  greens: number
  reds: number
  blue: number
  grays: number
}

export function useStats() {
  const fakeStats = {
    meals: 0,
    kcal: 0,
    workouts: 0,
    score: 0,
    greens: 0,
    reds: 0,
    blue: 0,
    grays: 0
  }

  // in the home we use month stats
  const thisMonthStats: Stats = fakeStats

  const thisWeekStats: Stats = fakeStats

  const todayStats: Stats = fakeStats

  const thisWeekPerDayStats: Stats[] = []

  return {
    thisMonthStats,
    thisWeekStats,
    todayStats,
    thisWeekPerDayStats
  }
}
