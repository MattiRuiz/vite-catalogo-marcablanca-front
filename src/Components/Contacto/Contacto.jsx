import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { Col, Row, Form, Spinner, Image, Ratio } from 'react-bootstrap'

import { PiMapPinLine, PiPhone, PiCity } from 'react-icons/pi'
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
    <Row className="shadow-sm justify-content-center px-2 py-5 align-items-center">
      {/* <Col
        xs={12}
        lg={6}
        xl={5}
        className="p-0 text-white d-flex flex-column justify-content-center overflow-hidden"
      >
        <Image src={productos} fluid className="animated-image rounded" />
      </Col> */}
      <Col xs={12} md={4}>
        <div className="d-flex justify-content-center flex-column">
          <div className="border rounded-top-3">
            <Ratio aspectRatio={'4x3'}>
              <iframe
                className="w-100 h-100 rounded-top-3"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.1498496349436!2d-60.650228000000006!3d-32.947052899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab1569f04db9%3A0x272e6f5a15593378!2sBlanquer%C3%ADa%20Marca%20Blanca!5e0!3m2!1ses!2sar!4v1729120690996!5m2!1ses!2sar"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Ratio>
          </div>
          <div className="border d-flex flex-column px-5 py-4 justify-content-center border-top-0 rounded-bottom-3">
            <h1 className="fw-bold">Contactanos</h1>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-1">
                <a
                  href="tel:+5493417017747"
                  className="text-decoration-none d-flex align-items-center text-dark"
                >
                  <PiPhone className="fs-5 text-secondary me-2" />
                  3417017747
                </a>
              </li>
              <li className="d-flex align-items-center mb-1">
                <a
                  href="https://maps.app.goo.gl/Lukn1CDmAamZJQGV9"
                  target="_blank"
                  className="text-decoration-none d-flex align-items-center text-dark"
                >
                  <PiMapPinLine className="fs-5 text-secondary me-2" /> San Luis
                  1927
                </a>
              </li>
              <li className="d-flex align-items-center mb-1">
                <PiCity className="fs-5 text-secondary me-2" /> Rosario, Santa
                Fe
              </li>

              <li className="mt-3">
                <Boton
                  className="d-inline-flex align-items-center"
                  href="https://api.whatsapp.com/send?phone=5493413278887"
                  target="_blank"
                >
                  <SiWhatsapp className="fs-5 me-2" /> Envianos un Whatsapp
                </Boton>
              </li>
            </ul>
          </div>
        </div>
      </Col>
      <Col xs={12} lg={6} xl={5} className="py-4 text-start ms-xl-5">
        {/* <h1 className="fw-bold">Contactanos</h1>
        <ul className="list-unstyled">
          <li className="d-flex align-items-center mb-1">
            <a
              href="tel:+5493417017747"
              className="text-decoration-none d-flex align-items-center text-dark"
            >
              <PiPhone className="fs-5 text-secondary me-2" />
              3417017747
            </a>
          </li>
          <li className="d-flex align-items-center mb-1">
            <a
              href="https://maps.app.goo.gl/Lukn1CDmAamZJQGV9"
              className="text-decoration-none d-flex align-items-center text-dark"
            >
              <PiMapPinLine className="fs-5 text-secondary me-2" /> San Luis
              1927
            </a>
          </li>
          <li className="d-flex align-items-center mb-1">
            <a
              href="https://maps.app.goo.gl/Lukn1CDmAamZJQGV9"
              className="text-decoration-none d-flex align-items-center text-dark"
            >
              <PiCity className="fs-5 text-secondary me-2" /> Rosario, Santa Fe
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
        </ul> */}
        <h3 className="fw-bold">O envianos un mensaje:</h3>
        <p className="mb-4">
          ¿Tenés consultas, dudas o recomendaciones? ¿Algo no está funcionando
          como debería? <strong>No dudes en escribirnos.</strong>
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
