import axios from 'axios'

const baseUrl = import.meta.env.VITE_NAME

const getAllTipoProductos = async () => {
  try {
    const respuesta = await axios(`${baseUrl}/api/tipoProductos`)
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

const getAdminTipoProductos = async () => {
  try {
    const respuesta = await axios(`${baseUrl}/api/tipoProductos/admin`)
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
        Authorization: window.localStorage.getItem('token'),
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
        Authorization: window.localStorage.getItem('token'),
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
        Authorization: window.localStorage.getItem('token'),
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
        Authorization: window.localStorage.getItem('token'),
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
  getAdminTipoProductos,
}
