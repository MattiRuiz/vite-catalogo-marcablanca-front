import { useState, useEffect } from 'react'
import { Button, Form, Modal, Alert, Spinner } from 'react-bootstrap'
import { createMarca, updateMarca } from '../../../../Functions/MarcasFunctions'

import { PiGearSixDuotone, PiPlusCircleDuotone } from 'react-icons/pi'

const MarcasCRUD_popup = ({ marca, onMarcaUpdated, closePopUp }) => {
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

    if (!dataToSend.nombre) {
      alertDanger()
      setAlertHeader('Error')
      setAlertMessage(
        'Hay campos vacíos, por favor complete todos los datos para continuar.'
      )
      setLoading(false)
      handleShowAlert()
    } else if (marca) {
      const id = marca.id

      const response = await updateMarca(id, dataToSend)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al querer actualizar la marca')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
        console.log(response)
      } else {
        alertSuccess()
        setAlertHeader('Marca actualizada')
        setAlertMessage('La marca ha sido actualizada con éxito')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
        onMarcaUpdated()
        console.log(response)
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
        onMarcaUpdated()
      }
    }
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
      <Modal.Header className="pb-2 border-0 bg-secondary-subtle" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          {marca ? (
            <>
              <PiGearSixDuotone className="me-2" /> Editar una marca
            </>
          ) : (
            <>
              <PiPlusCircleDuotone className="me-2" /> Añadir una marca
            </>
          )}
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
        <Button
          variant="secondary"
          onClick={() => closePopUp()}
          className="bg-gradient border-0"
        >
          Cancelar
        </Button>
        {marca ? (
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
              'Crear marca'
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default MarcasCRUD_popup
