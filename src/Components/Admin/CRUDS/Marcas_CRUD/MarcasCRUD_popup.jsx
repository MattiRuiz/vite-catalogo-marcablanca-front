import { useState, useEffect } from 'react'
import { Button, Form, Modal, Alert, Spinner } from 'react-bootstrap'
import { createMarca, updateMarca } from '../../../../Functions/MarcasFunctions'

const MarcasCRUD_popup = ({ marca, onClienteUpdated, closePopUp }) => {
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

  const [marcaData, setMarcaData] = useState({
    nombre: '',
  })

  //#region UseEffect
  useEffect(() => {
    if (marca) {
      setMarcaData({
        nombre: marca.nombre || '',
      })
    }
  }, [marca])
  //#endregion

  //#region Handle guardar cambios (CREAR O EDITAR)
  const handleGuardar = async () => {
    setLoading(true)
    const dataToSend = {
      ...marcaData,
    }

    if (marca) {
      const id = marca.id

      const response = await updateMarca(id, dataToSend)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al querer actualizar la marca')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Marca actualizada')
        setAlertMessage('La marca ha sido actualizada con éxito')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
      }
    } else {
      const response = await createMarca(dataToSend)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al crear una marca nueva')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Marca creada')
        setAlertMessage('La marca ha sido creada con éxito')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
      }
    }
    onClienteUpdated()
  }
  //#endregion

  //#region Handle de todos los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setMarcaData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  //#endregion

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {marca ? <h4>Editar marca</h4> : <h4>Añadir marca</h4>}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre de la empresa:</Form.Label>
            <Form.Control
              type="text"
              className="mb-2 "
              placeholder="Nombre"
              name="nombre"
              value={marcaData.nombre}
              onChange={handleInputChange}
            />
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
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Button>
        {marca ? (
          <Button onClick={handleGuardar}>Guardar cambios</Button>
        ) : (
          <Button onClick={handleGuardar}>Crear marca</Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default MarcasCRUD_popup
