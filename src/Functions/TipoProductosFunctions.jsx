import axios from 'axios'
import {token} from './LoginFunctions.jsx'

const baseUrl = import.meta.env.VITE_NAME

const getAllTipoProductos = async () => {
  try {
    const respuesta = await axios(`${baseUrl}/api/tipoProductos`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

const getOneTipoProducto = async (id) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/tipoProductos/${id}`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

const createTipoProducto = async (data) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/tipoProductos`, {
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

const updateTipoProducto = async (id, data) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/tipoProductos/${id}`, {
      method: 'PUT',
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

const deleteTipoProducto = async (id, data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/tipoProductos/${id}`,
      method: 'DELETE',
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

export {
  getAllTipoProductos,
  getOneTipoProducto,
  createTipoProducto,
  updateTipoProducto,
  deleteTipoProducto,
}
