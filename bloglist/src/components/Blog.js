import React from 'react'
import {Button, Form} from 'react-bootstrap'
import {likeBlog, removeBlog, newComment} from '../reducers/blogReducer'
import {useDispatch, useSelector} from 'react-redux'
import {showSuccessNotification} from '../reducers/notificationReducer'
const Blog = ({blog}) => {
  const dispatch = useDispatch()
  const user = useSelector(({user}) => user)

  const updateBlog = () => {
    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1
    }
    dispatch(likeBlog(blog.id, blogObject))
  }

  const removeUserBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(removeBlog(blog.id))
      dispatch(showSuccessNotification('succesfully removed blog'))
      setTimeout(() => {
        dispatch(showSuccessNotification(null))
      }, 3000)
    } else {
      console.log('failed')
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    const commentObject = {
      comment: comment
    }
    dispatch(newComment(blog.id, commentObject))
  }
  if (!blog || !user) {
    return null
  }
  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a><br />
      <span id="likesSum">{blog.likes} likes</span><Button id="like" onClick={updateBlog}>like</Button><br />
      <span>added by {blog.author}</span><br />
      {user.id === blog.user.id && <Button onClick={removeUserBlog}>remove</Button>}
      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Control type="text" name="comment" placeholder="add comment" />
          <Button type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <ul>
        {blog.comments.map(c =>
          <li key={c.id}>
            {c.comment}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Blog
