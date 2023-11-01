import axios from "axios";

const baseUrl = "http://localhost:5678";

const getAllTipoProductos = async () => {
  const respuesta = await axios.get(`${baseUrl}/api/tipoProductos`);
  return respuesta;
};

const getOneTipoProducto = async (id) => {
  const respuesta = await axios.get(`${baseUrl}/api/tipoProductos/${id}`);
  return respuesta;
};

const createTipoProducto = async (data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/tipoProductos`,
      method: "POST",
      data: data,
    });
    return respuesta;
  } catch (errors) {
    console.log(errors);
  }
};

const updateTipoProducto = async (id, data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/tipoProductos/${id}`,
      method: "PUT",
      data: data,
    });
    return respuesta;
  } catch (errors) {
    console.log(errors);
  }
};

const deleteTipoProducto = async (id, data) => {
  try {
    const respuesta = await axios({
      url: `${baseUrl}/api/tipoProductos/${id}`,
      method: "DELETE",
      data: data,
    });
    return respuesta;
  } catch (errors) {
    console.log(errors);
  }
};

export {
  getAllTipoProductos,
  createTipoProducto,
  updateTipoProducto,
  getOneTipoProducto,
  deleteTipoProducto,
};
