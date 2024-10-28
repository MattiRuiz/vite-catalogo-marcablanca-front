import axios from 'axios'

const baseUrl = import.meta.env.VITE_NAME

const clearData = () => {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    return 'success'
  } catch (e) {
    console.log('clearData error', e)
  }
}

const getAllClientes = async () => {
  const respuesta = await axios.get(`${baseUrl}/api/clientes`, {
    method: 'GET',
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
  })
  return respuesta
}

const createCliente = async (_data) => {
  try {
    const response = await axios(`${baseUrl}/api/clientes`, {
      method: 'POST',
      data: _data,
      headers: {
        Authorization: window.localStorage.getItem('token'),
      },
    })
    return response.data
  } catch (errors) {
    console.log(errors)
  }
}
const updateCliente = async (_id, _data) => {
  try {
    const response = await axios(`${baseUrl}/api/clientes/${_id}`, {
      method: 'PUT',
      data: _data,
      headers: {
        Authorization: window.localStorage.getItem('token'),
      },
    })
    return response
  } catch (errors) {
    console.log(errors)
  }
}

const deleteCliente = async (_id) => {
  try {
    const response = await axios(`${baseUrl}/api/clientes/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: window.localStorage.getItem('token'),
      },
    })
    return response
  } catch (errors) {
    return errors.response
  }
}

const changePassword = async (_id, _data) => {
  try {
    const response = await axios(
      `${baseUrl}/api/clientes/updatepassword/${_id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: window.localStorage.getItem('token'),
        },
        data: _data,
      }
    )
    return response
  } catch (errors) {
    console.log(errors)
  }
}

const getSuscripcion = async (_id) => {
  const response = await axios(`${baseUrl}/api/subscripciones/${_id}`)
  return response
}

const createSuscripcion = async (_data) => {
  try {
    const response = await axios(`${baseUrl}/api/subscripciones`, {
      method: 'POST',
      data: _data,
      headers: {
        Authorization: window.localStorage.getItem('token'),
      },
    })
    return response.data
  } catch (errors) {
    console.log(errors)
  }
}

const editSuscripcion = async (_id, _data) => {
  try {
    const response = await axios(`${baseUrl}/api/subscripciones/${_id}`, {
      method: 'PUT',
      data: _data,
      headers: {
        Authorization: window.localStorage.getItem('token'),
      },
    })
    return response.data
  } catch (errors) {
    console.log(errors)
  }
}

const cancelSuscripcion = async (_id) => {
  try {
    const response = await axios(`${baseUrl}/api/cancelarSubscripcion/${_id}`, {
      method: 'PUT',
      headers: {
        Authorization: window.localStorage.getItem('token'),
      },
    })
    return response.data
  } catch (errors) {
    console.error(errors)
    return errors
  }
}

export {
  getAllClientes,
  createCliente,
  updateCliente,
  deleteCliente,
  clearData,
  changePassword,
  getSuscripcion,
  createSuscripcion,
  editSuscripcion,
  cancelSuscripcion,
}
