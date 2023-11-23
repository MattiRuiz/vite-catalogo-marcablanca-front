import { useState, useContext } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Alert,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import LoginContext from '../../Context/LoginContext'
import loginCliente from '../../Functions/LoginFunctions'

import catalogo from '../../Images/mockup_catalogo.png'

function Login() {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

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
  const { handleLogin } = useContext(LoginContext)

  const navigate = useNavigate()

  const userNameHandler = (e) => {
    setUserName(e.target.value)
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  const dataSender = async () => {
    try {
      const data = {
        username: userName,
        password: password,
      }

      if (!data.username || !data.password) {
        setAlertMessage('Hay campos vacios, por favor rellene todos los datos.')
        handleShow()
      } else {
        const response = await loginCliente(data)
        const esAdmin = response.data.esAdmin

        if (esAdmin === 0) {
          handleLogin(response.data)
          navigate('/welcome')
        } else if (esAdmin === 1) {
          handleLogin(response.data)
          navigate('/admin')
        } else {
          alert('Usuario o contraseña incorrectos') //este else no está funcionando, entra directamente al catch
        }
      }
    } catch (error) {
      // alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.')
      setAlertMessage('Usuario o contraseña incorrectos.')
      handleShow()
      console.error('Error:', error)
    }
  }
  return (
    <Container className="bg-white" fluid>
      <Form onSubmit={handleSubmit}>
        <Row className="py-5 justify-content-center justify-content-md-around  align-items-center">
          <Col xs={11} md={5} lg={4}>
            <h4>INGRESAR</h4>
            <Form.Group className="py-2">
              <Form.Label>Nombre de usuario:</Form.Label>
              <Form.Control type="text" onChange={userNameHandler} />
            </Form.Group>
            <Form.Group className="py-2">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control type="password" onChange={passwordHandler} />
            </Form.Group>
            <Button type="submit" className="mt-3" onClick={dataSender}>
              Ingresar
            </Button>

            <Alert
              variant="danger"
              className="my-4"
              onClose={handleClose}
              show={showAlert}
              dismissible
            >
              <Alert.Heading className="fs-6">
                <strong>Error!</strong>
              </Alert.Heading>
              {alertMessage}
            </Alert>
          </Col>
          <Col xs={12} md={6} lg={5}>
            <Row className="justify-content-center text-center">
              <Col xs={8} className="mt-3 pt-4">
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
    </Container>
  )
}

export default Login
