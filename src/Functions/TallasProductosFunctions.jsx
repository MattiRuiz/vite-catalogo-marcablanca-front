import axios from 'axios'

const baseUrl = import.meta.env.VITE_NAME

const deleteTallaProducto = async (id) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/productosTallas/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: window.localStorage.getItem('token'),
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
        Authorization: window.localStorage.getItem('token'),
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
        Authorization: window.localStorage.getItem('token'),
      },
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

export { deleteTallaProducto, createTallaProducto, updateTallaProducto }
