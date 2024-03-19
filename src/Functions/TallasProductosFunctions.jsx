import axios from 'axios'

const baseUrl = import.meta.env.VITE_NAME
const token = window.localStorage.getItem('token')

const deleteTallaProducto = async (id) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/productosTallas/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

const createTallaProducto = async (data) => {
  console.log('entra a la función', data)
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/productosTallas`,
      method: 'POST',
      data: data,
      headers: {
        'Authorization': token
      }
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

export { deleteTallaProducto, createTallaProducto }
