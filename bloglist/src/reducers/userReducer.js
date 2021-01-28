import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'GET_USER':
    return action.user
  case 'SET_USER':
    return action.user
  default:
    return state
  }
}

export const setToken = (loggedUser) => {
  return async dispatch => {
    await blogService.setToken(loggedUser.token)
    dispatch({
      type: 'GET_USER',
      user: loggedUser
    })
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export default userReducer