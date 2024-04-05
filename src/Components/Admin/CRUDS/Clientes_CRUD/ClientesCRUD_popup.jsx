import { useState, useEffect } from 'react'
import { Button, Form, Modal, Alert, Spinner } from 'react-bootstrap'
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
  const [edit, setEdit] = useState(false)

  const [showAlert, setShowAlert] = useState(false)
  const handleShowAlert = () => setShowAlert(true)
  const handleCloseAlert = () => setShowAlert(false)
  const [loading, setLoading] = useState(false)

  const [alertVariant, setAlertVariant] = useState('danger')
  const alertDanger = () => setAlertVariant('danger')
  const alertSuccess = () => setAlertVariant('success')
  const [alertMessage, setAlertMessage] = useState(
    'Ha ocurrido un error, por favor intente más tarde'
  )
  const [alertHeader, setAlertHeader] = useState('Error')

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
    setLoading(true)
    const dataToSend = {
      ...clienteData,
    }

    if (!dataToSend.nombre || !dataToSend.apellido || !dataToSend.username) {
      alertDanger()
      setAlertHeader('Error')
      setAlertMessage(
        'Hay campos vacíos, por favor complete todos los datos para continuar.'
      )
      setLoading(false)
      handleShowAlert()
    } else if (cliente) {
      const id = cliente.id
      const response = await updateCliente(id, dataToSend)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al querer actualizar el cliente')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Cliente actualizado')
        setAlertMessage('El cliente ha sido actualizado con éxito')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
        onClienteUpdated()
      }
    } else {
      const response = await createCliente(dataToSend)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al crear el cliente')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Cliente creado')
        setAlertMessage('El cliente ha sido creado con éxito')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
        onClienteUpdated()
      }
    }
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
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="border-0 bg-primario text-white" closeButton>
        {cliente ? (
          <Modal.Title>Editar cliente</Modal.Title>
        ) : (
          <Modal.Title>Añadir cliente</Modal.Title>
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
        {loading ? (
          <Spinner className="my-3 d-block mx-auto" animation="border" />
        ) : (
          ''
        )}
        <Alert
          variant={alertVariant}
          className="mt-3 mb-0"
          onClose={handleCloseAlert}
          show={showAlert}
          dismissible
        >
          <Alert.Heading className="fs-6">
            <strong>{alertHeader}</strong>
          </Alert.Heading>
          {alertMessage}
        </Alert>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => closePopUp()}>
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
