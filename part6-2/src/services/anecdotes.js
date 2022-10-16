import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const object = { content, votes: 0, id: getId() }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const appendVote = async (content) => {
  const object = { ...content, votes: content.votes+1 }
  const response = await axios.patch(`${baseUrl}/${content.id}`, object)
  return response.data
}

const services = { getAll, createNew, appendVote}

export default services
