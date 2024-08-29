import { useState, useContext } from 'react'
import { Row, Col, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import LoginContext from '../../Context/LoginContext'
import loginCliente from '../../Functions/LoginFunctions'

import { Boton, PopUp, Tostada } from '../../ui'
import { PiWarningDuotone } from 'react-icons/pi'

function Login() {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [popUpForgotPassword, setPopUpForgotPassword] = useState(false)
  const { handleLogin } = useContext(LoginContext)
  const navigate = useNavigate()

  const [showAlert, setShowAlert] = useState(false)

  const [alertMessage, setAlertMessage] = useState(
    'Ha ocurrido un error, por favor intente más tarde'
  )
  const [alertHeader, setAlertHeader] = useState('Hubo un problema')

  const handleSubmit = (event) => {
    event.preventDefault()
    dataSender()
  }

  const userNameHandler = (e) => {
    setUserName(e.target.value)
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  const dataSender = async () => {
    try {
      setLoading(true)
      const data = {
        username: userName,
        password: password,
      }

      if (!data.username || !data.password) {
        setAlertMessage(
          'Hay campos vacios, por favor complete todos los datos para iniciar sesión.'
        )
        setAlertHeader('Hubo un problema')
        setShowAlert(true)
      } else {
        const response = await loginCliente(data)
        const user = {
          token: response.data.token,
          userData: {
            id: response.data.id,
            esAdmin: response.data.esAdmin,
            username: response.data.username,
          },
        }

        if (user.userData.esAdmin === 0) {
          handleLogin(user)
          navigate('/welcome')
        } else if (user.userData.esAdmin === 1) {
          handleLogin(user)
          navigate('/admin')
        }
      }
    } catch (error) {
      setAlertMessage(
        'Usuario o contraseña incorrectos. Por favor intente nuevamente.'
      )
      setAlertHeader('Datos incorrectos')
      setShowAlert(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Row className="justify-content-center justify-content-md-around align-items-center alto-container">
        <Col xs={11} sm={8} md={5} lg={4}>
          <Form onSubmit={handleSubmit}>
            <h1 className="fw-bold mb-4">Iniciar sesión</h1>
            <Form.Group className="py-2">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control type="text" onChange={userNameHandler} />
            </Form.Group>
            <Form.Group className="py-2">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" onChange={passwordHandler} />
            </Form.Group>
            <Link
              className="fst-italic d-block py-1 fw-semibold text-primary opacity-75"
              onClick={() => setPopUpForgotPassword(true)}
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <Boton
              type="submit"
              className="my-3 w-100"
              onClick={dataSender}
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                'Ingresar'
              )}
            </Boton>
          </Form>
          <p>
            ¿No tenés cuenta? Consulta las{' '}
            <Link to={'/suscripciones'} className="fw-bold text-primary">
              Suscripciones
            </Link>
          </p>
        </Col>
        <Tostada
          onClose={() => setShowAlert(false)}
          show={showAlert}
          header={alertHeader}
        >
          {alertMessage}
        </Tostada>
      </Row>
      {popUpForgotPassword && (
        <PopUp
          header={
            <>
              <PiWarningDuotone className="me-2 text-danger" />
              ¿Olvidaste tu contraseña?
            </>
          }
          closePopUp={() => setPopUpForgotPassword(false)}
        >
          <p>
            Para garantizar la seguridad de tu cuenta, te pedimos que te
            acerques a nuestro establecimiento con los{' '}
            <strong>datos de tu cuenta.</strong> De esta manera, podremos
            restablecer tu contraseña manualmente.
          </p>
        </PopUp>
      )}
    </>
  )
}
export default Login
