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

    if (!dataToSend.nombre && !dataToSend.dimensiones) {
      alertDanger()
      setAlertHeader('Error')
      setAlertMessage('Ambos campos no pueden encontrarse vacíos.')
      setLoading(false)
      handleShowAlert()
    } else if (talla) {
      const id = talla.id
      const response = await updateTalla(id, dataToSend)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al querer actualizar la medida.')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 2000)
      } else {
        alertSuccess()
        setAlertHeader('Medida actualizada')
        setAlertMessage('La medida ha sido actualizada con éxito.')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
        onTallaUpdated()
      }
      setLoading(false)
    } else {
      const response = await createTalla(dataToSend)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al crear una medida nueva')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Medida creada')
        setAlertMessage('La medida ha sido creada con éxito')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
        onTallaUpdated()
      }
      setLoading(false)
    }
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
      <Modal.Header className="border-0 bg-primario text-white" closeButton>
        <Modal.Title>{talla ? 'Editar medida' : 'Añadir medida'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              Nombre de la medida <span className="text-danger">*</span>:
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Nombre"
              name="nombre"
              value={tallaData.nombre}
              onChange={handleInputChange}
            />
            <Form.Label>
              Dimensiones <span className="text-danger">*</span>:
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-1"
              placeholder="Dimensiones"
              name="dimensiones"
              value={tallaData.dimensiones}
              onChange={handleInputChange}
            />
          </Form.Group>
          <p className="texto-14">
            <em>
              <span className="text-danger">*</span> Uno de los valores puede
              encontrarse en vacío pero no ambos.
            </em>
          </p>
        </Form>
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
        {talla ? (
          <Button onClick={handleGuardar} disabled={loading}>
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              'Guardar cambios'
            )}
          </Button>
        ) : (
          <Button onClick={handleGuardar} disabled={loading}>
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              'Crear medida'
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default TallasCRUD_popup
