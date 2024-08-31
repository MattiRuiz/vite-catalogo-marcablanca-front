import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { Col, Row, Form, Spinner, Image } from 'react-bootstrap'

import { PiMapPinLineDuotone, PiPhoneDuotone } from 'react-icons/pi'
import { SiWhatsapp } from 'react-icons/si'

import productos from '../../Images/all.webp'

import { Boton, Input, Tostada } from '../../ui'

const Contacto = () => {
  const form = useRef()
  const [user, setUser] = useState()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const [alertVariant, setAlertVariant] = useState('danger')
  const [alertMessage, setAlertMessage] = useState(
    'Ha ocurrido un error y no se ha podido enviar el mensaje, por favor intente más tarde.'
  )
  const [alertHeader, setAlertHeader] = useState('Hubo un problema')

  const sendEmail = (e) => {
    e.preventDefault()
    setLoading(true)

    if (!name || !email || !message) {
      setAlertVariant('danger')
      setAlertHeader('Hubo un problema')
      setAlertMessage(
        'Por favor, complete todos los campos para enviar un mensaje.'
      )
      setShowAlert(true)
      setLoading(false)
      return
    }

    emailjs
      .sendForm('service_p5d2n28', 'template_w6y7yub', form.current, {
        publicKey: '9Lx1ZzKqr2d0THYPw',
      })
      .then(
        () => {
          setAlertVariant('success')
          setAlertHeader('¡Mensaje enviado!')
          setAlertMessage('Su mensaje ha sido enviado con éxito.')
          setShowAlert(true)

          setName('')
          setEmail('')
          setMessage('')
        },
        (error) => {
          setAlertVariant('danger')
          setAlertHeader('Error')
          setAlertMessage(error.text)
          setShowAlert(true)
        }
      )

    setLoading(false)
  }

  useEffect(() => {
    const userLoged = localStorage.getItem('userData')
    if (userLoged) {
      setUser(JSON.parse(userLoged))
      setName(JSON.parse(userLoged).username) // Setear el nombre del usuario logueado
    }
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
            <Boton
              className="d-inline-flex align-items-center"
              href="https://api.whatsapp.com/send?phone=5493413278887"
              target="_blank"
            >
              <SiWhatsapp className="fs-5 me-2" /> Envianos un Whatsapp
            </Boton>
          </li>
        </ul>
        <h3 className="fw-bold mt-4">O un mensaje:</h3>
        <p>
          ¿Tenés consultas, dudas o recomendaciones? ¿Algo no está funcionando
          como debería? No dudes en escribirnos.
        </p>
        <Form ref={form} onSubmit={sendEmail}>
          {user ? (
            <Input
              label="Usuario"
              type="text"
              name="user_name"
              placeholder="Nombre"
              value={name}
              disabled
            />
          ) : (
            <Input
              label="Nombre"
              type="text"
              name="user_name"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <Input
            label="Email"
            type="text"
            name="user_email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="message"
            placeholder="Escriba su mensaje aquí"
            className="mb-3"
            style={{ height: '100px' }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Boton className="mt-2" type="submit" value="Send">
            Enviar
          </Boton>
        </Form>
        {loading && (
          <Spinner className="my-3 d-block mx-auto" animation="border" />
        )}
        <Tostada
          show={showAlert}
          onClose={() => setShowAlert(false)}
          header={alertHeader}
          variant={alertVariant}
        >
          {alertMessage}
        </Tostada>
      </Col>
    </Row>
  )
}

export default Contacto
