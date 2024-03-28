import axios from 'axios';
import {token} from '../helpers/updateToken.jsx'

const baseUrl = import.meta.env.VITE_NAME;

const getAllMarcas = async () => {
  try {
    const respuesta = await axios.get(`${baseUrl}/api/marcas`)
    return respuesta
  } catch (error) {
    console.error(error)
  }
}

const getOneMarca = async (_id) => {
  try {
    const respuesta = await axios.get(`${baseUrl}/api/marcas/${_id}`);
    return respuesta;
  } catch (error) { 
    console.error(error);
  }
}

const createMarca = async (_data) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/marcas`, {
      data: _data,
      method: 'POST',
      headers: {
        Authorization: token,
      },
    })

    return respuesta
  } catch (error) {
    console.error(error)
  }
}

const updateMarca = async (_id, _data) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/marcas/${_id}`, {
      data: _data,
      method: 'PUT',
      headers: {
        Authorization: token,
      },
    })

    return respuesta
  } catch (error) {
    console.error(error)
  }
}

const deleteMarca = async (id) => {
  try {
    const respuesta = await axios(`${baseUrl}/api/marcas/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })

    return respuesta
  } catch (error) {
    console.error(error)
  }
}

export { getAllMarcas, createMarca, updateMarca, getOneMarca, deleteMarca }
