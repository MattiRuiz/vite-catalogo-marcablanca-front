import { useState } from 'react'
import { Form } from 'react-bootstrap'

import { createCliente } from '../../../Functions/ClienteFunctions'

import EditarSuscripcion from './EditarSuscripcion'
import { PopUp, Input } from '../../../ui'
import { PiPlusCircleDuotone } from 'react-icons/pi'

const ClientesCRUD_popup = ({ onClienteUpdated, closePopUp, showToast }) => {
  const [clienteData, setClienteData] = useState({
    id: '',
    nombre: '',
    apellido: '',
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleGuardar = async () => {
    setLoading(true)

    const dataToSend = {
      ...clienteData,
    }

    if (!dataToSend.nombre || !dataToSend.apellido || !dataToSend.username) {
      showToast(
        'danger',
        'Error',
        'Hay campos vacíos, por favor complete todos los datos para continuar.'
      )
      setLoading(false)
    } else {
      const response = await createCliente(dataToSend)
      setLoading(false)
      if (!response) {
        showToast('danger', 'Error', 'Hubo un problema al crear un cliente.')
      } else {
        showToast(
          'success',
          'Cliente creado',
          'El cliente ha sido creado con éxito.'
        )
        onClienteUpdated()
        closePopUp()
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setClienteData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <PopUp
      header={
        <>
          <PiPlusCircleDuotone className="me-2" />
          Añadir cliente
        </>
      }
      closePopUp={closePopUp}
      buttonLabel="Guardar"
      onAction={handleGuardar}
      loading={loading}
      variant="primary"
    >
      <Form>
        <Input
          label="Nombre:"
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={clienteData.nombre}
          onChange={handleInputChange}
        />
        <Input
          label="Apellido:"
          type="text"
          placeholder="Apellido"
          name="apellido"
          value={clienteData.apellido}
          onChange={handleInputChange}
        />
        <Input
          label="Nombre de usuario:"
          type="text"
          placeholder="Username"
          name="username"
          value={clienteData.username}
          onChange={handleInputChange}
        />

        <Input
          label="Contraseña:"
          type="password"
          placeholder="Password"
          name="password"
          value={clienteData.password}
          onChange={handleInputChange}
        />
      </Form>
      {/* <EditarSuscripcion id={clienteData.id} showToast={showToast} /> */}
    </PopUp>
  )
}

export default ClientesCRUD_popup