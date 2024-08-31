import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

import {
  createCliente,
  updateCliente,
} from '../../../../Functions/ClienteFunctions'

import { PopUp, Input } from '../../../../ui'
import { PiGearSixDuotone, PiPlusCircleDuotone } from 'react-icons/pi'

const ClientesCRUD_popup = ({
  cliente,
  onClienteUpdated,
  closePopUp,
  showToast,
}) => {
  const [clienteData, setClienteData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    password: '',
  })
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (cliente) {
      setClienteData({
        nombre: cliente.clientes.nombre || '',
        apellido: cliente.clientes.apellido || '',
        username: cliente.username || '',
        password: cliente.password || '',
      })
    }
  }, [cliente])

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
    } else if (cliente) {
      const id = cliente.id
      const response = await updateCliente(id, dataToSend)
      setLoading(false)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al querer actualizar el cliente.'
        )
      } else {
        showToast(
          'success',
          'Cliente actualizada',
          'El cliente ha sido actualizada con éxito.'
        )
        onClienteUpdated()
        closePopUp()
      }
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
        cliente ? (
          <>
            <PiGearSixDuotone className="me-2" />
            Editar cliente
          </>
        ) : (
          <>
            <PiPlusCircleDuotone className="me-2" />
            Añadir cliente
          </>
        )
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
        {cliente ? (
          <>
            <Input
              label="Contraseña:"
              type="password"
              placeholder="Password"
              name="password"
              value={clienteData.password}
              onChange={handleInputChange}
              disabled={!edit}
            />
            <Form.Check
              type="checkbox"
              label="Modificar contraseña"
              value={edit}
              onChange={() => {
                setEdit(!edit)
              }}
            />
          </>
        ) : (
          <Input
            label="Contraseña:"
            type="password"
            placeholder="Password"
            name="password"
            value={clienteData.password}
            onChange={handleInputChange}
          />
        )}
      </Form>
    </PopUp>
  )
}

export default ClientesCRUD_popup
