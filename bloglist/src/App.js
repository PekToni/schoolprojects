import React, {useState, useEffect, useRef} from 'react'
import {Form, Button, Navbar, Nav} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Switch, Route, Link, useRouteMatch} from 'react-router-dom'
import Notification from './components/Notification'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import {showSuccessNotification, showErrorNotification} from './reducers/notificationReducer'
import {initializeBlogs} from './reducers/blogReducer'
import {setToken, setUser} from './reducers/userReducer'
import {getUserBlogs} from './reducers/usersReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getUserBlogs())
  }, [dispatch])

  const blogs = useSelector(({blogs}) => {
    return blogs
  })

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setToken(user))
    }
  }, [dispatch])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(setToken(user))
      setUsername('')
      setPassword('')
      dispatch(showSuccessNotification('successfully logged in'))
      setTimeout(() => {
        dispatch(showSuccessNotification(null))
      }, 3000)
    } catch(exception) {
      console.log('wrong credentials')
      dispatch(showErrorNotification(exception.response.data.error))
      setTimeout(() => {
        dispatch(showErrorNotification(null))
      }, 3000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(setUser(null))
    dispatch(showSuccessNotification('successfully logged out'))
    setTimeout(() => {
      dispatch(showSuccessNotification(null))
    }, 3000)
  }
  const user = useSelector(({user}) => user)
  const backgroundStyle = {background: 'grey', padding: 5}
  if (user === null) {
    return (
      <div className="container" style={backgroundStyle}>
        <h2>Log in to application</h2>
        <div>
          <Notification />
        </div>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control id="username" type="text" value={username}
              onChange={({target}) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control id="password" type="password" value={password}
              onChange={({target}) => setPassword(target.value)}
            />
          </Form.Group>
          <Button variant="primary" id="login" type="submit">login</Button>
        </Form>
      </div>
    )
  }

  const links = {padding: 2}
  const userStyle = {padding: 2, color: 'white'}
  return (
    <div className="container" style={backgroundStyle}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Blog app</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={links} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={links} to="/users">users</Link>
            </Nav.Link>
            <span style={userStyle}>{user.name} logged in <Button id="logoutButton" onClick={logout}>logout</Button></span>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        <Notification />
      </div>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blog} />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <Blogs />
        </Route>
      </Switch>
    </div>
  )
}
export default App