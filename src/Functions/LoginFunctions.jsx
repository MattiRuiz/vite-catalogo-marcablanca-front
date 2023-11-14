import axios from "axios";

const baseUrl = import.meta.env.VITE_NAME;

const loginCliente = async (data) => {
    try {
    const response = await axios({
        url: `${baseUrl}/api/login/clientes`,
        method: "POST",
        data: data
    })
    localStorage.setItem('token', response.data.token);
    return response;
    } catch (errors) {
    console.log(errors);
    }
}

export default loginCliente