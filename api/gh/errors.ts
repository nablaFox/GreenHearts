export enum GetUserError {}

export enum AddPostError {
  InvalidTitle = 'InvalidTitle',
  DuplicateKey = 'DuplicateKey'
  // ...
}

export enum VotePostError {
  SomethingWentWrong = 'SomethingWentWrong'
}
