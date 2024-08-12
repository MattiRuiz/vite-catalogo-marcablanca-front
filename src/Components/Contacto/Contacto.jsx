import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

import { Col, Row, Form, Button, Alert, Spinner, Image } from 'react-bootstrap'

import { PiMapPinLineDuotone, PiPhoneDuotone } from 'react-icons/pi'

import { SiWhatsapp } from 'react-icons/si'

import productos from '../../Images/all.webp'

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

  const sendEmail = (e) => {
    e.preventDefault()
    handleCloseAlert()
    setLoading(true)

    // Validar si los campos requeridos están vacíos
    const formData = new FormData(form.current)
    const userName = formData.get('user_name')
    const userEmail = formData.get('user_email')
    const userMessage = formData.get('message')

    if (!userName || !userEmail || !userMessage) {
      alertDanger()
      setAlertHeader('Error')
      setAlertMessage(
        'Por favor, completa todos los campos antes de enviar el mensaje.'
      )
      handleShowAlert()
      setLoading(false)
      return // Salir de la función si hay campos vacíos
    }

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
    <Row className="shadow-sm py-md-3 justify-content-center px-2 px-md-0">
      <Col
        xs={12}
        lg={6}
        xl={5}
        className="p-0 text-white d-flex flex-column justify-content-center overflow-hidden"
      >
        <Image src={productos} fluid className="animated-image rounded" />
      </Col>
      <Col xs={12} lg={6} xl={5} className="py-4 text-start ms-xl-5">
        <h1 className="fw-bold">Contactos</h1>
        <ul className="list-unstyled">
          <li className="d-flex align-items-center mb-1">
            <a
              href="tel:+5493417017747"
              className="text-decoration-none d-flex align-items-center text-dark"
            >
              <PiPhoneDuotone className="me-2" />
              3417017747
            </a>
          </li>
          <li className="d-flex align-items-center mb-1">
            <a
              href="https://maps.app.goo.gl/Lukn1CDmAamZJQGV9"
              className="text-decoration-none d-flex align-items-center text-dark"
            >
              <PiMapPinLineDuotone className="me-2" /> San Luis 1927 | Rosario,
              Santa Fe
            </a>
          </li>

          <li className="my-3">
            <Button
              className="d-inline-flex align-items-center"
              href="https://api.whatsapp.com/send?phone=5493413278887"
              target="_blank"
            >
              <SiWhatsapp className="fs-5 me-2" /> Envianos un Whatsapp
            </Button>
          </li>
        </ul>
        <h3 className="fw-bold mt-4">O un mensaje:</h3>
        <p>
          ¿Tenés consultas, dudas o recomendaciones? ¿Algo no está funcionando
          como debería? No dudes en escribirnos.
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
  )
}

export default Contacto
