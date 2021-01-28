import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = async (blogObject) => {
  const config = {headers: {authorization: token}}
  const res = await axios.post(baseUrl, blogObject, config)
  return res.data
}

const updateLikes = async (blogid, blogObject) => {
  const config = {headers: {authorization: token}}
  const res = await axios.put(`${baseUrl}/${blogid}`, blogObject, config)
  return res.data
}

const removeBlog = async (blogid) => {
  const config = {headers: {authorization: token}}
  const res = await axios.delete(`${baseUrl}/${blogid}`, config)
  return res.data
}

const addComment = async (blogid, comment) => {
  const res = await axios.post(`${baseUrl}/${blogid}/comments`, comment)
  return res.data
}

export default {setToken, getAll, create, updateLikes, removeBlog, addComment}