import { useState, useEffect } from 'react'
import { Button, Form, Modal, Alert, Spinner } from 'react-bootstrap'
import { createTalla, updateTalla } from '../../../../Functions/TallasFunctions'

const TallasCRUD_popup = ({ talla, onTallaUpdated, closePopUp }) => {
  const [tallaData, setTallaData] = useState({
    nombre: '',
    dimensiones: '',
  })

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
    if (talla) {
      setTallaData({
        nombre: talla.nombre || '',
        dimensiones: talla.dimensiones || '',
      })
    }
  }, [talla])
  //#endregion

  //#region Handle guardar cambios (CREAR O EDITAR)
  const handleGuardar = async () => {
    setLoading(true)
    const dataToSend = {
      ...tallaData,
    }

    if (talla) {
      const id = talla.id

      const response = await updateTalla(id, dataToSend)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al querer actualizar la medida')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Medida actualizada')
        setAlertMessage('La medida ha sido actualizada con éxito')
        handleShowAlert()
        setTimeout(() => closePopUp(), 3000)
      }
    } else {
      const response = await createTalla(dataToSend)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al crear una medida nueva')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Marca creada')
        setAlertMessage('La medida ha sido creada con éxito')
        handleShowAlert()
        setTimeout(() => closePopUp(), 3000)
      }
    }
    onTallaUpdated()
  }
  //#endregion

  //#region Handle de todos los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTallaData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  //#endregion

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {talla ? <h4>Editar medida</h4> : <h4>Añadir medida</h4>}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre de la medida:</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Nombre"
              name="nombre"
              value={tallaData.nombre}
              onChange={handleInputChange}
            />
            <Form.Label>Dimensiones:</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Dimensiones"
              name="dimensiones"
              value={tallaData.dimensiones}
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
        {talla ? (
          <Button onClick={handleGuardar}>Guardar cambios</Button>
        ) : (
          <Button onClick={handleGuardar}>Crear cliente</Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default TallasCRUD_popup
