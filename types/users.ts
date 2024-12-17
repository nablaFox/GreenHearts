export interface UserInDatabase {
  isOwl?: boolean
  bunnies?: string[]
  username?: string
}

export interface User extends UserInDatabase {
  key: string
}
