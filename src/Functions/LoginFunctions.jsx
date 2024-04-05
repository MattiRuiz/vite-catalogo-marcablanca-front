<<<<<<< HEAD
import axios from 'axios';
let token = 'qasd'
const baseUrl = import.meta.env.VITE_NAME;
=======
import axios from 'axios'
import { updateToken } from '../helpers/updateToken.jsx'

const baseUrl = import.meta.env.VITE_NAME

>>>>>>> 00c7590a26c0aa76f00550b4940a0df2c31a867b
const loginCliente = async (data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/api/login/clientes`,
      method: 'POST',
      data: data,
    })

    const userDataObject = {
      id: response.data.id,
      esAdmin: response.data.esAdmin,
      username: response.data.username,
    }

<<<<<<< HEAD
    const userData = JSON.stringify(userDataObject);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userData', userData);
    return response;
=======
    const userData = JSON.stringify(userDataObject)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('userData', userData)
    localStorage.setItem('exp', response.data.expirationDate)
    updateToken()

    return response
>>>>>>> 00c7590a26c0aa76f00550b4940a0df2c31a867b
  } catch (errors) {
    console.log(errors)
  }
}

<<<<<<< HEAD
export default loginCliente;
export {token}
=======
export default loginCliente
>>>>>>> 00c7590a26c0aa76f00550b4940a0df2c31a867b
