import { useState, useContext, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Dropdown,
  Modal,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LoginContext from '../../Context/LoginContext'
import {
  PiUserFill,
  PiGearFill,
  PiNoteFill,
  PiUserCircleGearFill,
  PiXCircleFill,
} from 'react-icons/pi'
import imageLogo from '../../Images/logo-marca.svg'

function Navbar() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)
  const [user, setUser] = useState(false)

  const { menu, unauthorize } = useContext(LoginContext)

  const logout = () => {
    handleClose()
    unauthorize()
  }

  useEffect(() => {
    try {
      const typeUser = JSON.parse(localStorage.getItem('userData'))
      if (typeUser.esAdmin == 1) {
        setUser(true)
      } else {
        setUser(false)
      }
    } catch {
      setUser(false)
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
              <Button as={Link} to={'/catalogo'} className="me-2 navbar-tab">
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
                  {user ? (
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
                    <></>
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
                    to={'/configuracion'}
                    className="d-flex align-items-center"
                  >
                    <PiGearFill className="me-2" /> Configuración
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
        <Modal.Header className="border-0 bg-primario text-white" closeButton>
          <Modal.Title>¡Atención!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Deseas cerrar sesión?</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => logout()}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
export default Navbar
