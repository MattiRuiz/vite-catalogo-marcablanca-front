import axios from 'axios'

const baseUrl = import.meta.env.VITE_NAME
const token = window.localStorage.getItem('token')

const getAllTallas = async () => {
  try {
    const respuesta = await axios.get(`${baseUrl}/api/tallas`)
    return respuesta
  } catch (error) {
    console.error(error)
  }
}

const getOneTalla = async (_id) => {
  try {
    const respuesta = await axios.get(`${baseUrl}/api/tallas/${_id}`)
    return respuesta
  } catch (error) {
    console.error(error)
  }
}

const createTalla = async (_data) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/tallas`, {
      method: 'POST',
      data: _data,
      headers: {
        Authorization: token,
      },
    })
    return respuesta
  } catch (error) {
    return error.response.status
  }
}

const updateTalla = async (_id, _data) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/tallas/${_id}`, {
      method: 'PUT',
      data: _data,
      headers: {
        Authorization: token,
      },
    })
    return respuesta
  } catch (error) {
    console.error(error)
  }
}

const deleteTalla = async (_id) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/tallas/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
    return respuesta
  } catch (error) {
    console.error(error)
  }
}

export { getAllTallas, createTalla, updateTalla, getOneTalla, deleteTalla }
