import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_LIKE':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'REMOVE_BLOG':
    const data = state.filter(blog => blog.id !== action.blogid)
    return data
  case 'NEW_COMMENT':
    const id = action.data.blog
    const blogToChange = state.find(blog => blog.id === id)
    const changedBlog = {...blogToChange, comments: blogToChange.comments.concat(action.data)}
    return state.map(blog => blog.id !== id ? blog : changedBlog)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export const likeBlog = (blogId, blogObject) => {
  return async dispatch => {
    const like = await blogService.updateLikes(blogId, blogObject)
    dispatch({
      type: 'NEW_LIKE',
      data: like
    })
  }
}

export const removeBlog = (blogId) => {
  return async dispatch => {
    const res = await blogService.removeBlog(blogId)
    console.log('remove response ', res)
    dispatch({
      type: 'REMOVE_BLOG',
      blogid: blogId
    })
  }
}

export const newComment = (blogId, comment) => {
  return async dispatch => {
    const res = await blogService.addComment(blogId, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: res
    })
  }
}

export default blogReducer