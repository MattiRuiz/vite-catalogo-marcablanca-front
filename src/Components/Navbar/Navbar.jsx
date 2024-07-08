import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Dropdown,
  Modal,
} from 'react-bootstrap'

import LoginContext from '../../Context/LoginContext'

import {
  PiUserFill,
  PiGearFill,
  PiNoteFill,
  PiUserCircleGearFill,
  PiXCircleFill,
  PiCoinsFill,
} from 'react-icons/pi'
import imageLogo from '../../Images/logo-marca.svg'

function Navbar() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)

  const { menu, setMenu, unauthorize } = useContext(LoginContext)

  const logout = () => {
    handleClose()
    unauthorize()
  }

  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const user = {
          token: token,
          userData: JSON.parse(localStorage.getItem('userData')),
        }
        setMenu(user)
      } else {
        setMenu()
      }
    } catch {
      setMenu()
    }
  }, [])

  return (
    <Container fluid className="shadow">
      <Row className="bg-primary pt-3 pb-2 text-center text-white px-3">
        <Col xs={6} className="ps-0">
          <Link to={'/'}>
            <Image src={imageLogo} className="logo-home d-block" />
          </Link>
        </Col>
        {menu ? (
          <Col xs={6} className="d-flex justify-content-end">
            <div className="d-flex align-items-center">
              <Button as={Link} to={'/welcome'} className="me-2 navbar-tab">
                Catálogo
              </Button>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="d-flex align-items-center mb-1 p-1"
                >
                  <PiUserFill className="me-1 fs-6" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {menu.userData?.esAdmin ? (
                    <>
                      <Dropdown.Item
                        as={Link}
                        to={'/admin'}
                        className="fw-bold d-flex align-items-center"
                      >
                        <PiUserCircleGearFill className="me-2" /> Administrar
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </>
                  ) : (
                    ''
                  )}
                  <Dropdown.Item
                    as={Link}
                    to={'/contacto'}
                    className="d-flex align-items-center"
                  >
                    <PiNoteFill className="me-2" /> Contacto
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={'/configurar-precios'}
                    className="d-flex align-items-center"
                  >
                    <PiCoinsFill className="me-2" /> Configurar precios
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={'/mi-cuenta'}
                    className="d-flex align-items-center"
                  >
                    <PiGearFill className="me-2" /> Mi cuenta
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={handleOpen}
                    className="d-flex align-items-center"
                  >
                    <PiXCircleFill className="me-2 text-danger" /> Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        ) : (
          <Col xs={6} className="d-flex justify-content-end align-items-center">
            <Button as={Link} to={'/login'}>
              Ingresar
            </Button>
          </Col>
        )}
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className="fw-bold">¡Atención!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-0">
          <p className="mb-0">¿Desea cerrar la sesión de su cuenta?</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => logout()}>
            Cerrar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
export default Navbar
