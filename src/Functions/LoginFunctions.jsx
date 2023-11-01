import axios from "axios";

const baseUrl = "http://localhost:5678";

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
