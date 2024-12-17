export enum Heart {
  Green = 1,
  Blue = 0.25,
  Red = -1,
  Gray = 0
}

export const AssignableHearts: Heart[] = [Heart.Green, Heart.Blue, Heart.Red]

export const HeartStringMap = {
  [Heart.Red]: 'reds',
  [Heart.Green]: 'greens',
  [Heart.Blue]: 'blue',
  [Heart.Gray]: 'grays'
}
