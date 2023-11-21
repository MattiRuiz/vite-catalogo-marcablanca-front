import axios from "axios";

const baseUrl = import.meta.env.VITE_NAME;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Interceptar las solicitudes para incluir el token de autorización en el encabezado
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

const getAllTipoProductos = async () => {
  const respuesta = await axios.get(`${baseUrl}/api/tipoProductos`)
  localStorage.setItem('tipoProductos', JSON.stringify(respuesta.data))
  return respuesta
}

const getOneTipoProducto = async (id) => {
    const respuesta = await axios.get(`${baseUrl}/api/tipoProductos/${id}`)
    return respuesta;
}

const createTipoProducto = async (data) => {
    try {
      const respuesta = await axios({
        url: `${baseUrl}/api/tipoProductos`,
        method: "POST",
        data: data
      })
      return respuesta;
    } catch (errors) {
      console.log(errors);
    }
  }

const updateTipoProducto = async (id, data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/tipoProductos/${id}`,
      method: "PUT",
      data: data
    })
    return respuesta;
  } catch (errors) {
    console.log(errors);
  }
}

const deleteTipoProducto = async (id, data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/tipoProductos/${id}`,
      method: "DELETE",
      data: data
    })
    return respuesta;
  } catch (errors) {
    console.log(errors);
  }
}
    
export {
    getAllTipoProductos,
    createTipoProducto,
    updateTipoProducto,
    getOneTipoProducto,
    deleteTipoProducto
}