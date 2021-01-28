import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_USERS_BLOGS':
    return action.data
  default:
    return state
  }
}

export const getUserBlogs = () => {
  return async dispatch => {
    const usersBlogs = await userService.getAllUserBlogs()
    dispatch({
      type: 'GET_USERS_BLOGS',
      data: usersBlogs
    })
  }
}

export default usersReducer