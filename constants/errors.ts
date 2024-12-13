export const FirebaseAuthErrors = {
  'auth/email-already-in-use':
    'The email address is already in use by another account.',
  'auth/invalid-email': 'The email address is badly formatted.',
  'auth/operation-not-allowed': 'This operation is not allowed.',
  'auth/weak-password': 'The password is too weak.',
  'auth/user-disabled':
    'The user account has been disabled by an administrator.',
  'auth/user-not-found':
    'There is no user record corresponding to this identifier. The user may have been deleted.',
  'auth/wrong-password':
    'The password is invalid or the user does not have a password.'
  // ...
}

export const FirebaseFirestoreErrors = {
  'permission-denied':
    'The client does not have permission to perform the requested operation.',
  unauthenticated:
    'The request does not have valid authentication credentials for the operation.'
  // ...
}

export const FirebaseStorageErrors = {
  'storage/object-not-found': 'No object exists at the desired reference.'
  // ...
}

export const FirebaseErrors = {
  ...FirebaseAuthErrors,
  ...FirebaseFirestoreErrors,
  ...FirebaseStorageErrors
}

export const GenericServerErrors = {
  'server-error': 'An error occurred on the server.'
  // ...
}

export const FetchPostsErrors = {
  ...FirebaseFirestoreErrors,
  ...GenericServerErrors
}

export const AddPostErrors = {
  ...FirebaseFirestoreErrors,
  ...GenericServerErrors,
  'other-add-specific-error': 'An error occurred while adding the post.'
}

export const VotePostErrors = {
  ...FirebaseFirestoreErrors,
  ...GenericServerErrors,
  'other-vote-specific-error': 'An error occurred while voting the post.'
}

export const FetchUserErrors = {
  ...FirebaseFirestoreErrors
}

export const LoginErrors = {
  ...FirebaseAuthErrors
}
