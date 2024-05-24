import axios from 'axios'

const baseUrl = import.meta.env.VITE_NAME

const getAllProductosSinTallas = async () => {
  const respuesta = await axios.get(`${baseUrl}/api/productos`)
  return respuesta
}
const getAllProductos = async () => {
  const respuesta = await axios.get(`${baseUrl}/api/productostallas`)
  return respuesta
}

const getAllProductosAdmin = async () => {
  const respuesta = await axios.get(`${baseUrl}/api/productosAdmin`)
  return respuesta
}

const getProductosPorCategoria = async (id) => {
  const respuesta = await axios.get(
    `${baseUrl}/api/productostallas/categoria/${id}`
  )
  return respuesta
}

const getProductoById = async (id) => {
  const respuesta = await axios.get(`${baseUrl}/api/productoTallaId/${id}`)
  return respuesta
}

const createProducto = async (_data) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/productos`, {
      method: 'POST',
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

const updateProducto = async (id, _data) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/productos/${id}`, {
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

const deleteProducto = async (_id) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/productos/${_id}`, {
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

const getAllImages = async (_id) => {
  const respuesta = await axios.get(`${baseUrl}/api/imagenes/byproducts/${_id}`)
  return respuesta
}

const getImagenesPorProducto = async (_id) => {
  const respuesta = await axios.get(`${baseUrl}/api/imagenes/byproducts/${_id}`)
  return respuesta
}

const createImagen = async (_data) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/imagenes`, {
      method: 'POST',
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

const deleteImagen = async (_id) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/imagenes/${_id}`, {
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

const editPrecioEnGrupo = async (_data) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/productosTallas/precios`, {
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

export {
  getAllProductos,
  getAllProductosSinTallas,
  getProductosPorCategoria,
  createProducto,
  updateProducto,
  getProductoById,
  deleteProducto,
  getAllImages,
  getImagenesPorProducto,
  createImagen,
  deleteImagen,
  editPrecioEnGrupo,
  getAllProductosAdmin,
}
