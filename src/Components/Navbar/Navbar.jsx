import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Button, Dropdown } from 'react-bootstrap'

import LoginContext from '../../Context/LoginContext'

import {
  PiGearFill,
  PiNoteFill,
  PiUserCircleGearFill,
  PiXCircleFill,
  PiCoinsFill,
  PiDotsThreeVerticalBold,
} from 'react-icons/pi'

import imageLogo from '../../Images/logo-marca.svg'
import { PopUp } from '../../ui'

function Navbar() {
  const [show, setShow] = useState(false)

  const { menu, setMenu, unauthorize } = useContext(LoginContext)

  const logout = () => {
    setShow(false)
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
              <Button as={Link} to={'/'} className="me-2 navbar-tab">
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
                        to={'/administrador-marcablanca'}
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
                    onClick={() => setShow(true)}
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
      {show && (
        <PopUp
          header="¡Atención!"
          closePopUp={() => setShow(false)}
          buttonLabel="Cerrar sesión"
          onAction={logout}
          variant="danger"
        >
          <p>¿Desea cerrar la sesión de su cuenta?</p>
        </PopUp>
      )}
    </>
  )
}
export default Navbar
