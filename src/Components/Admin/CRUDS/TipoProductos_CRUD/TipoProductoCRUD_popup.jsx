import { useState, useEffect } from 'react'
import { Button, Form, Modal, Alert, Spinner } from 'react-bootstrap'
import {
  createTipoProducto,
  updateTipoProducto,
} from '../../../../Functions/TipoProductosFunctions'

const TallasCRUD_popup = ({
  tipoProducto,
  onTipoProductoUpdated,
  closePopUp,
}) => {
  const [tallaData, setTallaData] = useState({
    nombre: '',
    imagen: '',
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
    if (tipoProducto) {
      setTallaData({
        nombre: tipoProducto.nombre || '',
        imagen: tipoProducto.imagen || '',
      })
    }
  }, [tipoProducto])
  //#endregion

  //#region Handle guardar cambios (CREAR O EDITAR)
  const handleGuardar = async () => {
    setLoading(true)
    const dataToSend = {
      ...tallaData,
    }

    const formDataForAPI = new FormData()
    formDataForAPI.append('nombre', dataToSend.nombre)
    formDataForAPI.append('imagen', dataToSend.imagen)

    if (tipoProducto) {
      const id = tipoProducto.id

      const response = await updateTipoProducto(id, formDataForAPI)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage(
          'Hubo un problema al querer actualizar el tipo de producto.'
        )
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Tipo de producto actualizado')
        setAlertMessage('El tipo de producto ha sido actualizada con éxito.')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
        onTipoProductoUpdated()
      }
    } else {
      const response = await createTipoProducto(formDataForAPI)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al crear un tipo de producto nuevo.')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Tipo de producto creado')
        setAlertMessage('El tipo de producto ha sido creado con éxito.')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
        onTipoProductoUpdated()
      }
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
      <Modal.Header closeButton>
        <Modal.Title>
          {tipoProducto ? (
            <h4>Editar Tipo de producto</h4>
          ) : (
            <h4>Añadir Tipo de producto</h4>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del tipo de producto:</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Nombre"
              name="nombre"
              value={tallaData.nombre}
              onChange={handleInputChange}
            />
            <Form.Label>Imágen:</Form.Label>
            <Form.Control
              className="mb-3"
              type="file"
              name="imagen"
              onChange={(e) =>
                setTallaData({ ...tallaData, imagen: e.target.files[0] })
              }
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
        {tipoProducto ? (
          <Button onClick={handleGuardar}>Guardar cambios</Button>
        ) : (
          <Button onClick={handleGuardar}>Crear tipo producto</Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default TallasCRUD_popup
