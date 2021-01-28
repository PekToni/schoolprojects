import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {createBlog} from '../reducers/blogReducer'
import {showSuccessNotification, showErrorNotification} from '../reducers/notificationReducer'
const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const addBlog = (event) => {
    event.preventDefault()
    const blogContent = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    try {
      dispatch(createBlog(blogContent))
      dispatch(showSuccessNotification(`${title} added`))
      setTimeout(() => {
        dispatch(showSuccessNotification(null))
      }, 3000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception) {
      dispatch(showErrorNotification(exception.response.data.error))
      setTimeout(() => {
        dispatch(showErrorNotification(null))
      }, 3000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <Form className="form" onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control name="title" className="title" type="text" value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control name="author" className="author" type="text" value={author}
            onChange={({target}) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control name="url" className="url" type="text" value={url}
            onChange={({target}) => setUrl(target.value)}
          />
        </Form.Group>
        <Button variant="primary" id="createButton" type="submit">create</Button>
      </Form>
    </div>
  )
}

export default BlogForm