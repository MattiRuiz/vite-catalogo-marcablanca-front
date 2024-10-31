import axios from 'axios'

const baseUrl = import.meta.env.VITE_NAME

const loginCliente = async (data) => {
  try {
    const response = await axios({
      url: `${baseUrl}/api/login/clientes`,
      method: 'POST',
      data: data,
    })

    const userDataObject = {
      ...response.data,
    }

    const userData = JSON.stringify(userDataObject)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('userData', userData)
    localStorage.setItem('exp', response.data.expirationDate)

    return response
  } catch (errors) {
    console.error(errors)
  }
}

export default loginCliente
