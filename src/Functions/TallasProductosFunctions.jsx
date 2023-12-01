import axios from 'axios'

const baseUrl = import.meta.env.VITE_NAME

const axiosInstance = axios.create({
  baseURL: baseUrl,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const deleteTallaProducto = async (id) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/productosTallas/${id}`,
      method: 'DELETE',
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
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

export { deleteTallaProducto, createTallaProducto }
