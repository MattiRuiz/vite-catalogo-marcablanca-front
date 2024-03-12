import { useState, useContext } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Alert,
  Spinner,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import LoginContext from '../../Context/LoginContext'
import loginCliente from '../../Functions/LoginFunctions'

import catalogo from '../../Images/mockup_catalogo.png'

import Footer from '../Footer/Footer'

function Login() {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const { handleLogin } = useContext(LoginContext)
  const navigate = useNavigate()

  const [showAlert, setShowAlert] = useState(false)
  const handleShow = () => setShowAlert(true)
  const handleClose = () => setShowAlert(false)
  const [alertMessage, setAlertMessage] = useState(
    'Ha ocurrido un error, por favor intente más tarde'
  )

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
          'Hay campos vacios, por favor complete todos los datos para continuar.'
        )
        handleShow()
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
      handleShow()
    } finally {
      setLoading(false)
    }
  }
  return (
    <Container className="bg-white" fluid>
      <Form onSubmit={handleSubmit}>
        <Row className="py-5 justify-content-center justify-content-md-around">
          <Col xs={11} md={5} lg={4} className="pt-4 pt-md-5">
            <h4>INGRESAR</h4>
            <Form.Group className="py-2">
              <Form.Label>Nombre de usuario:</Form.Label>
              <Form.Control type="text" onChange={userNameHandler} />
            </Form.Group>
            <Form.Group className="py-2">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control type="password" onChange={passwordHandler} />
            </Form.Group>
            <Button type="submit" className="mt-3 w-100" onClick={dataSender}>
              {loading ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                'Ingresar'
              )}
            </Button>

            <Alert
              variant="danger"
              className="mt-3 mb-0"
              onClose={handleClose}
              show={showAlert}
              dismissible
            >
              <Alert.Heading className="fs-6">
                <strong>Error</strong>
              </Alert.Heading>
              {alertMessage}
            </Alert>
          </Col>
          <Col xs={12} md={6} lg={5}>
            <Row className="justify-content-center text-center">
              <Col xs={8} md={6} className="mt-3 pt-4">
                <Image src={catalogo} fluid />
              </Col>
              <Col xs={11}>
                <h4>¡Nuevo catálogo digital!</h4>
                <p>
                  Pasá por nuestro local para suscribite a{' '}
                  <strong>Marca Blanca</strong> y comenzar a utilizar nuestro{' '}
                  <strong>Catálogo digital.</strong>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <Footer />
    </Container>
  )
}

export default Login
