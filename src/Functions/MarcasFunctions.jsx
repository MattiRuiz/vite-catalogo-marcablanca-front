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
);

const getAllMarcas = async () => {
  try {
    const respuesta = await axiosInstance.get('/api/marcas');
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

const getOneMarca = async (id) => {
  try {
    const respuesta = await axiosInstance.get(`/api/marcas/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

const createMarca = async (data) => {
  try {
    const respuesta = await axiosInstance.post('/api/marcas', data);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

const updateMarca = async (id, data) => {
  try {
    const respuesta = await axiosInstance.put(`/api/marcas/${id}`, data);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

const deleteMarca = async (id) => {
  try {
    const respuesta = await axiosInstance.delete(`/api/marcas/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

export {
  getAllMarcas,
  createMarca,
  updateMarca,
  getOneMarca,
  deleteMarca
};
