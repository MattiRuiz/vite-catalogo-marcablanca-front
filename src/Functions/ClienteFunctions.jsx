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

const getAllClientes = async () => {
    const respuesta = await axios.get(`${baseUrl}/api/clientes`)
    return respuesta
}

const getOneCliente = async (id) => {
    const respuesta = await axios.get(`${baseUrl}/api/clientes/${id}`)
    return respuesta;
}

const createCliente = async (data) => {
    try {
      const response = await axios({
        url: `${baseUrl}/api/clientes`,
        method: "POST",
        data: data
      })
      return response.data;
    } catch (errors) {
      console.log(errors);
    }
  }

const updateCliente = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/api/clientes/${id}`,
      method: "PUT",
      data: data
    })
    return response;
  } catch (errors) {
    console.log(errors);
  }
}

const deleteCliente = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/api/clientes/${id}`,
      method: "DELETE",
      data: data
    })
    return response;
  } catch (errors) {
    console.log(errors);
  }
}
    
export {
    getAllClientes,
    createCliente,
    updateCliente,
    getOneCliente,
    deleteCliente
}