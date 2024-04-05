import axios from 'axios';
let token = 'qasd'
const baseUrl = import.meta.env.VITE_NAME;
const loginCliente = async (data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/api/login/clientes`,
      method: 'POST',
      data: data,
    });

    const userDataObject = {
      id: response.data.id,
      esAdmin: response.data.esAdmin,
      username: response.data.username,
    };

    const userData = JSON.stringify(userDataObject);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userData', userData);
    return response;
  } catch (errors) {
    console.log(errors);
  }
};

export default loginCliente;
export {token}
