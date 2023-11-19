import { useState, useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {
  createCliente,
  updateCliente,
} from '../../../../Functions/ClienteFunctions'

const ClientesCRUD_popup = ({ cliente, onClienteUpdated, closePopUp }) => {
  const [clienteData, setClienteData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    password: '',
  })

  //#region UseEffect
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
  //#endregion

  //#region Handle guardar cambios (CREAR O EDITAR)
  const handleGuardar = async () => {
    const dataToSend = {
      ...clienteData,
    }

    if (cliente) {
      const id = cliente.id

      const response = await updateCliente(id, dataToSend)
      console.log('Cliente actualizado:', response)
    } else {
      const response = await createCliente(dataToSend)
      console.log('Cliente creado:', response)
    }
    onClienteUpdated()
    closePopUp()
  }
  //#endregion

  //#region Handle de todos los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setClienteData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  //#endregion

  return (
    <Modal centered show={true}>
      <Modal.Header>
        {cliente ? <h4>Editar cliente</h4> : <h4>Añadir cliente</h4>}
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              className="mb-2"
              placeholder="Nombre"
              name="nombre"
              value={clienteData.nombre}
              onChange={handleInputChange}
            />
            <Form.Label>Apellido:</Form.Label>
            <Form.Control
              type="text"
              className="mb-2"
              placeholder="Apellido"
              name="apellido"
              value={clienteData.apellido}
              onChange={handleInputChange}
            />
            <Form.Label>Nombre de usuario:</Form.Label>
            <Form.Control
              type="text"
              className="mb-2"
              placeholder="Username"
              name="username"
              value={clienteData.username}
              onChange={handleInputChange}
            />
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              className="mb-2"
              placeholder="Password"
              name="password"
              value={clienteData.password}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="me-1"
          onClick={() => closePopUp()}
        >
          Cancelar
        </Button>
        {cliente ? (
          <Button onClick={handleGuardar}>Guardar cambios</Button>
        ) : (
          <Button onClick={handleGuardar}>Crear cliente</Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ClientesCRUD_popup
