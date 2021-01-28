import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector(({blogs}) => blogs)

  return(
    <div>
      <Table striped variant="dark">
        <tbody>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs