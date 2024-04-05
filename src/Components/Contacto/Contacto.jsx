import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

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
  const form = useRef()

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

  const [user, setUser] = useState()

  // const handleEnviar = () => {
  //   handleCloseAlert()
  //   setLoading(true)
  //   if (!messageData.nombre || !messageData.email || !messageData.mensaje) {
  //     alertDanger()
  //     setAlertHeader('Hubo un problema')
  //     setAlertMessage(
  //       'Hay campos que se encuentran vacíos, por favor rellene todos los datos para enviar el mensaje.'
  //     )
  //     handleShowAlert()
  //     onTimeout(() => handleCloseAlert(), 3000)
  //   }
  //   setLoading(false)
  // }

  const sendEmail = (e) => {
    e.preventDefault()
    handleCloseAlert()
    setLoading(true)

    emailjs
      .sendForm('service_p5d2n28', 'template_w6y7yub', form.current, {
        publicKey: '9Lx1ZzKqr2d0THYPw',
      })
      .then(
        () => {
          alertSuccess()
          setAlertHeader('Mensaje enviado')
          setAlertMessage('Su mensaje ha sido enviado con éxito.')
          handleShowAlert()
          console.log('SUCCESS!')
        },
        (error) => {
          alertDanger()
          setAlertHeader('Error')
          setAlertMessage(
            'Hubo un problema al enviar un mensaje, por favor intente más tarde.'
          )
          handleShowAlert()
          console.log('FAILED...', error.text)
        }
      )

    setLoading(false)
  }

  useEffect(() => {
    const userLoged = localStorage.getItem('userData')
    if (userLoged) {
      setUser(JSON.parse(userLoged))
    }
    console.log('effect', userLoged)
  }, [])

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
            <Form ref={form} onSubmit={sendEmail}>
              <Form.Label>Nombre:</Form.Label>
              {console.log(user)}
              {user ? (
                <Form.Control
                  type="text"
                  name="user_name"
                  placeholder="Nombre"
                  className="mb-3"
                  value={user.username}
                  disabled
                />
              ) : (
                <Form.Control
                  type="text"
                  name="user_name"
                  placeholder="Nombre"
                  className="mb-3"
                />
              )}
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                name="user_email"
                placeholder="Email"
                className="mb-3"
              />
              <Form.Label>Mensaje:</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="message"
                placeholder="Escriba su mensaje aquí"
                className="mb-3"
                style={{ height: '100px' }}
              />
              <Button type="submit" value="Send" className="mt-2">
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
