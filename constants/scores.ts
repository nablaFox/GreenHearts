export const scores = [1, 0.25, -1, 0] as const

export const assignableScores = [1, 0.25, -1] as const

export const colors = ['red', 'blue', 'green', 'gray'] as const

export const ScoreColorMap: Record<HeartScore, HeartColor> = {
  1: 'red',
  0.25: 'blue',
  '-1': 'green',
  0: 'gray'
} as const
