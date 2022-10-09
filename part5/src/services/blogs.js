import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

async function getAll() {
  const response = await axios.get(baseUrl)
  return response.data
}

async function createBlog(objData) {
  const user = JSON.parse(localStorage.getItem('user'))
  const response = await axios.post(baseUrl, objData, {headers: { 'Authorization': `Bearer ${user.token}`}})
  return response.data
}

async function updateBlog(objData) {
  const user = JSON.parse(localStorage.getItem('user'))
  const response = await axios.put(`${baseUrl}/${objData.id}`, objData, {headers: { 'Authorization': `Bearer ${user.token}`}})
  return response.data
}

export {getAll, createBlog, updateBlog}
