export const FetchPosts_Msgs: Record<FetchPostsStatus, string> = {
  loading: 'Loading...',
  success: 'Success',
  SomethingWentWrong: 'Something went wrong. Please try again later.'
}

export const AddPosts_Msgs: Record<AddPostStatus, string> = {
  InvalidTitle: 'Title must be at least 3 characters long.',
  DuplicateKey: 'This post already exists.',
  loading: 'Loading...',
  success: 'Success'
}

export const VotePost_Msgs: Record<VotePostStatus, string> = {
  loading: 'Loading...',
  success: 'Success',
  SomethingWentWrong: 'Something went wrong. Please try again later.'
}

export const FetchUser_Msgs: Record<FetchUserStatus, string> = {
  'first-time-user':
    'redirect to login where we show both a signup and a login button',
  'no-bunny': 'Welcome back! Please choose a bunny to continue.',
  'no-bunnies': 'No bunnies found',
  success: 'Success',
  loading: 'Loading...',
  SomethingWentWrong: 'Something went wrong. Please try again later.'
}

export const Login_Msgs: Record<LoginStatus, string> = {
  loading: 'Loading...',
  success: 'Success',
  SomethingWentWrong: 'Something went wrong. Please try again later.'
}

export const Logout_Msgs: Record<LogoutStatus, string> = {
  loading: 'Loading...',
  success: 'Success',
  SomethingWentWrong: 'Something went wrong. Please try again later.'
}
