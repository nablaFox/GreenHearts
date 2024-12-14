import { initContract } from '@ts-rest/core'

const c = initContract()

// Possible methods:

// '/users/add' --> admin
// '/users/get' --> admin
//
// '/users/{id}/delete'
// '/users/{id}/get'
//
// '/users/{id}/posts/add' --> admin
// '/users/{id}/posts/get'
//
// '/users/{id}/posts/{postId}/vote' --> admin
// '/users/{id}/posts/{postId}/get'
// '/users/{id}/posts/{postId}/delete'

const contract = c.router({
  getUser: {
    method: 'GET',
    path: '/users/:id/',
    pathParams: c.type<{ id: string }>(),
    responses: {}
  }
})

export default contract
