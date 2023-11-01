import axios from "axios";

const baseUrl = import.meta.env.REACT_APP_BASE_URL;

const loginCliente = async (data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/api/login/clientes`,
      method: "POST",
      data: data,
    });
    return response;
  } catch (errors) {
    console.log(errors);
  }
};

export default loginCliente;
