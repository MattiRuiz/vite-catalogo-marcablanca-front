import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Button, Dropdown, Modal } from 'react-bootstrap'

import LoginContext from '../../Context/LoginContext'

import {
  PiUserFill,
  PiGearFill,
  PiNoteFill,
  PiUserCircleGearFill,
  PiXCircleFill,
  PiCoinsFill,
  PiXCircleDuotone,
  PiDotsThreeVerticalBold,
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
    <>
      <Row className="bg-primary bg-gradient py-2 text-center text-white px-3 shadow-lg">
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
                  className="d-flex align-items-center py-1 px-2 border-0 bg-transparent"
                >
                  <PiDotsThreeVerticalBold className="fs-5" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {menu.userData?.esAdmin ? (
                    <>
                      <Dropdown.Item
                        as={Link}
                        to={'/admin'}
                        className="fw-bold d-flex align-items-center"
                      >
                        <PiUserCircleGearFill className="text-secondary fs-5 me-3" />{' '}
                        Administrar
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </>
                  ) : (
                    ''
                  )}
                  <Dropdown.Item
                    as={Link}
                    to={'/contacto'}
                    className="d-flex align-items-center py-2"
                  >
                    <PiNoteFill className="text-secondary fs-5 me-3" /> Contacto
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={'/configurar-precios'}
                    className="d-flex align-items-center py-2"
                  >
                    <PiCoinsFill className="text-secondary fs-5 me-3" />{' '}
                    Configurar precios
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={'/mi-cuenta'}
                    className="d-flex align-items-center py-2"
                  >
                    <PiGearFill className="text-secondary fs-5 me-3" /> Mi
                    cuenta
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={handleOpen}
                    className="d-flex align-items-center py-2"
                  >
                    <PiXCircleFill className="text-secondary fs-5 me-3" />{' '}
                    Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        ) : (
          <Col
            xs={6}
            className="d-flex justify-content-end align-items-center gap-1"
          >
            <Button
              as={Link}
              to={'/'}
              className="d-none d-md-block bg-transparent border-0"
            >
              Inicio
            </Button>
            <Button
              as={Link}
              to={'/contacto'}
              className="bg-transparent border-0"
            >
              Contacto
            </Button>
            <Button as={Link} to={'/login'} className="border bg-transparent">
              Ingresar
            </Button>
          </Col>
        )}
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="pb-2 border-0 bg-secondary-subtle" closeButton>
          <Modal.Title className="fw-bold d-flex align-items-center">
            <PiXCircleDuotone className="me-2 text-danger" />
            ¡Atención!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <p className="">¿Desea cerrar la sesión de su cuenta?</p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button
            variant="secondary"
            className="bg-gradient border-0"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            className="bg-gradient border-0"
            onClick={() => logout()}
          >
            Cerrar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default Navbar
