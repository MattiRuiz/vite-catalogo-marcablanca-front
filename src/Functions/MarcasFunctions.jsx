import axios from "axios";

const baseUrl = "http://localhost:5678";

const getAllMarcas = async () => {
  const respuesta = await axios.get(`${baseUrl}/api/marcas`);
  return respuesta;
};

const getOneMarca = async (id) => {
  const respuesta = await axios.get(`${baseUrl}/api/marcas/${id}`);
  return respuesta;
};

const createMarca = async (data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/api/marcas`,
      method: "POST",
      data: data,
    });
    return response;
  } catch (errors) {
    console.log(errors);
  }
};

const updateMarca = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/api/marcas/${id}`,
      method: "PUT",
      data: data,
    });
    return response;
  } catch (errors) {
    console.log(errors);
  }
};

const deleteMarca = async (id, data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/api/marcas/${id}`,
      method: "DELETE",
      data: data,
    });
    return response;
  } catch (errors) {
    console.log(errors);
  }
};

export { getAllMarcas, createMarca, updateMarca, getOneMarca, deleteMarca };
