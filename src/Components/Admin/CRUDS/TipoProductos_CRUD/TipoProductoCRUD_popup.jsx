import { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Modal,
  Alert,
  Spinner,
  Image,
  Row,
  Col,
  Ratio,
} from 'react-bootstrap'
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

  const baseUrl = import.meta.env.VITE_NAME

  const [showAlert, setShowAlert] = useState(false)
  const handleShowAlert = () => setShowAlert(true)
  const handleCloseAlert = () => setShowAlert(false)
  const [loading, setLoading] = useState(false)
  const [loadingImagen, setLoadingImagen] = useState(false)

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
        //onTipoProductoUpdated()
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

  const handleCambiarImagen = async (event) => {
    setLoadingImagen(true)
    const dataToSend = {
      imagen: event.target.files[0],
      nombre: tipoProducto.nombre,
    }

    const formDataForAPI = new FormData()
    formDataForAPI.append('nombre', dataToSend.nombre)
    formDataForAPI.append('imagen', dataToSend.imagen)

    const id = tipoProducto.id

    try {
      const response = await updateTipoProducto(id, formDataForAPI)
      console.log('Imagen editada', response)
    } catch (e) {
      console.log('Error al editar una imagen', response)
    }
    setLoadingImagen(false)
    closePopUp()
    onTipoProductoUpdated()
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="border-0 bg-primario text-white" closeButton>
        <Modal.Title>
          {tipoProducto ? 'Editar Tipo de producto' : 'Añadir Tipo de producto'}
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
            {tipoProducto ? (
              <Row className="justify-content-center">
                <Col
                  xs={4}
                  className="border border-end-0 py-2"
                  style={{ borderRadius: '8px 0 0 8px' }}
                >
                  <Ratio aspectRatio="1x1" className="rounded-circle">
                    <Image
                      fluid
                      className="object-fit-cover rounded-circle"
                      src={`${baseUrl}${tipoProducto.rutaImagen}`}
                    />
                  </Ratio>
                </Col>
                <Col
                  xs={7}
                  className="d-flex align-items-start flex-column justify-content-center border border-start-0"
                  style={{ borderRadius: '0 8px 8px 0' }}
                >
                  <p className="mb-2">Imágen:</p>
                  <label htmlFor="fileInput">
                    <Button as="span">
                      {loadingImagen ? (
                        <Spinner
                          animation="border"
                          variant="light"
                          size="sm"
                          className="mx-4"
                        />
                      ) : (
                        'Cambiar imagen'
                      )}
                    </Button>
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleCambiarImagen}
                    />
                  </label>
                </Col>
              </Row>
            ) : (
              <>
                <Form.Label>Imágen:</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="file"
                  name="imagen"
                  onChange={(e) =>
                    setTallaData({ ...tallaData, imagen: e.target.files[0] })
                  }
                />
              </>
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
