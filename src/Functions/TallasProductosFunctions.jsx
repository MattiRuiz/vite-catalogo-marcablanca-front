import axios from 'axios'
import {token} from '../helpers/updateToken.jsx'

const baseUrl = import.meta.env.VITE_NAME

const deleteTallaProducto = async (id) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/productosTallas/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

const createTallaProducto = async (data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/productosTallas`,
      method: 'POST',
      data: data,
      headers: {
        Authorization: token,
      },
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

const updateTallaProducto = async (id, _data) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/productosTallas/${id}`, {
      method: 'PUT',
      data: _data,
      headers: {
        Authorization: token,
      },
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

export { deleteTallaProducto, createTallaProducto, updateTallaProducto }
