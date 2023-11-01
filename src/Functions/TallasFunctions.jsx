import axios from 'axios';

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

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const getAllTallas = async () => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const respuesta = await axios.get(`${baseUrl}/api/tallas`);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

const getOneTalla = async (id) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const respuesta = await axios.get(`${baseUrl}/api/tallas/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

const createTalla = async (data) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const respuesta = await axios.post(`${baseUrl}/api/tallas`, data);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

const updateTalla = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const respuesta = await axios.put(`${baseUrl}/api/tallas/${id}`, data);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

const deleteTalla = async (id) => {
  try {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    const respuesta = await axios.delete(`${baseUrl}/api/tallas/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export {
  getAllTallas,
  createTalla,
  updateTalla,
  getOneTalla,
  deleteTalla
};
