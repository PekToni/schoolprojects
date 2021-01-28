import React from 'react'
import {Table} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const Users = () => {
  const blogs = useSelector(({users}) => {
    if (!users) {
      return null
    }
    return users
  })
  if (!blogs) {
    return null
  }
  return (
    <div>
      <h2>Users</h2>
      <Table variant="dark">
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {blogs.sort((a, b) => b.blogs.length - a.blogs.length).map(user => {
            return <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Users