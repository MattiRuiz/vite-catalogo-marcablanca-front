import axios from "axios";

const baseUrl = import.meta.env.REACT_APP_BASE_URL;

const getAllTallas = async () => {
  const respuesta = await axios.get(`${baseUrl}/api/tallas`);
  return respuesta;
};

const getOneTalla = async (id) => {
  const respuesta = await axios.get(`${baseUrl}/api/tallas/${id}`);
  return respuesta;
};

const createTalla = async (data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/tallas`,
      method: "POST",
      data: data,
    });
    return respuesta;
  } catch (errors) {
    console.log(errors);
  }
};

const updateTalla = async (id, data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/tallas/${id}`,
      method: "PUT",
      data: data,
    });
    return respuesta;
  } catch (errors) {
    console.log(errors);
  }
};

const deleteTalla = async (id, data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/tallas/${id}`,
      method: "DELETE",
      data: data,
    });
    return respuesta;
  } catch (errors) {
    console.log(errors);
  }
};

export { getAllTallas, createTalla, updateTalla, getOneTalla, deleteTalla };
