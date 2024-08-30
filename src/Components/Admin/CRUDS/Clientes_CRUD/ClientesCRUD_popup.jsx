import { useState, useEffect } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'

import {
  createCliente,
  updateCliente,
} from '../../../../Functions/ClienteFunctions'

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
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="pb-2 border-0 bg-secondary-subtle" closeButton>
        {cliente ? (
          <Modal.Title className="fw-bold d-flex align-items-center">
            <PiGearSixDuotone className="me-2" />
            Editar cliente
          </Modal.Title>
        ) : (
          <Modal.Title className="fw-bold d-flex align-items-center">
            <PiPlusCircleDuotone className="me-2" />
            Añadir cliente
          </Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Nombre"
              name="nombre"
              value={clienteData.nombre}
              onChange={handleInputChange}
            />
            <Form.Label>Apellido:</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Apellido"
              name="apellido"
              value={clienteData.apellido}
              onChange={handleInputChange}
            />
            <Form.Label>Nombre de usuario:</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Username"
              name="username"
              value={clienteData.username}
              onChange={handleInputChange}
            />
            <Form.Label>Contraseña:</Form.Label>
            {cliente ? (
              <>
                <Form.Control
                  type="password"
                  className="mb-3"
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
              <Form.Control
                type="password"
                className="mb-3"
                placeholder="Password"
                name="password"
                value={clienteData.password}
                onChange={handleInputChange}
              />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="secondary"
          onClick={() => closePopUp()}
          className="bg-gradient border-0"
        >
          Cancelar
        </Button>
        {cliente ? (
          <Button
            className="bg-gradient border-0"
            onClick={handleGuardar}
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              'Guardar cambios'
            )}
          </Button>
        ) : (
          <Button
            onClick={handleGuardar}
            disabled={loading}
            type="submit"
            className="bg-gradient border-0"
          >
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              'Crear cliente'
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ClientesCRUD_popup
