import axios from 'axios'
const baseUrl = '/api/users'

const getAllUserBlogs = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

export default {getAllUserBlogs}