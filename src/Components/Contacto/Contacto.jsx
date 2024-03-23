import { useState } from 'react'

import {
  Col,
  Row,
  Container,
  Form,
  Button,
  Alert,
  Spinner,
} from 'react-bootstrap'

const Contacto = () => {
  const [messageData, setMessageData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  })
  const [showAlert, setShowAlert] = useState(false)
  const handleShowAlert = () => setShowAlert(true)
  const handleCloseAlert = () => setShowAlert(false)
  const [loading, setLoading] = useState(false)

  const [alertVariant, setAlertVariant] = useState('danger')
  const alertDanger = () => setAlertVariant('danger')
  const alertSuccess = () => setAlertVariant('success')
  const [alertMessage, setAlertMessage] = useState(
    'Ha ocurrido un error y no se ha podido enviar el mensaje, por favor intente más tarde.'
  )
  const [alertHeader, setAlertHeader] = useState('Hubo un problema')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setMessageData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleEnviar = () => {
    handleCloseAlert()
    setLoading(true)
    if (!messageData.nombre || !messageData.email || !messageData.mensaje) {
      alertDanger()
      setAlertHeader('Hubo un problema')
      setAlertMessage(
        'Hay campos que se encuentran vacíos, por favor rellene todos los datos para enviar el mensaje.'
      )
      handleShowAlert()
      onTimeout(() => handleCloseAlert(), 3000)
    }
    setLoading(false)
  }

  return (
    <>
      <Container>
        <Row className="justify-content-center py-5">
          <Col xs={11} lg={8}>
            <h3 className="fw-bold">Contacto</h3>
            <p>
              ¿Tenes consultas, dudas o recomendaciones? No dudes en
              escribirnos.
            </p>
            <Form>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Nombre"
                className="mb-3"
                onChange={handleInputChange}
              />
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                className="mb-3"
                onChange={handleInputChange}
              />
              <Form.Label>Mensaje:</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="mensaje"
                placeholder="Escriba su mensaje aquí"
                className="mb-3"
                style={{ height: '100px' }}
                onChange={handleInputChange}
              />
              <Button className="mt-2" onClick={() => handleEnviar()}>
                Enviar
              </Button>
            </Form>
            {loading ? (
              <Spinner className="my-3 d-block mx-auto" animation="border" />
            ) : (
              ''
            )}
            <Alert
              variant={alertVariant}
              className="mt-4 mb-0"
              onClose={handleCloseAlert}
              show={showAlert}
              dismissible
            >
              <Alert.Heading className="fs-6">
                <strong>{alertHeader}</strong>
              </Alert.Heading>
              {alertMessage}
            </Alert>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Contacto
