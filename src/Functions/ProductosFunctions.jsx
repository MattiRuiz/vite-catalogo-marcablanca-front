import axios from 'axios'

const baseUrl = import.meta.env.VITE_NAME

const axiosInstance = axios.create({
  baseURL: baseUrl,
})

// Interceptar las solicitudes para incluir el token de autorización en el encabezado
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

const getAllProductosSinTallas = async () => {
  const respuesta = await axios.get(`${baseUrl}/api/productos`)
  return respuesta
}
const getAllProductos = async () => {
  const respuesta = await axios.get(`${baseUrl}/api/productostallas`)
  return respuesta
}

const getProductosPorCategoria = async (id) => {
  const respuesta = await axios.get(
    `${baseUrl}/api/productostallas/categoria/${id}`
  )
  return respuesta
}

const getOneProducto = async (id) => {
  const respuesta = await axios.get(`${baseUrl}/api/productos/${id}`)
  return respuesta
}

const createProducto = async (data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/productos`,
      method: 'POST',
      data: data,
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

const updateProducto = async (id, data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/productos/${id}`,
      method: 'PUT',
      data: data,
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

const deleteProducto = async (id, data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/productos/${id}`,
      method: 'DELETE',
      data: data,
    })
    return respuesta
  } catch (errors) {
    console.log(errors)
  }
}

export {
  getAllProductos,
  getAllProductosSinTallas,
  getProductosPorCategoria,
  createProductoTalla,
  createProducto,
  updateProducto,
  getOneProducto,
  deleteProducto,
}
