import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Button, Dropdown } from 'react-bootstrap'

import LoginContext from '../../Context/LoginContext'

import {
  PiGearBold,
  PiNoteBold,
  PiUserCircleGearBold,
  PiXCircleBold,
  PiEyeBold,
  PiFileBold,
  PiDotsThreeVerticalBold,
  PiBookOpenBold,
} from 'react-icons/pi'

import imageLogo from '../../Images/logo-marca.svg'
import { PopUp } from '../../ui'

function Navbar() {
  const [show, setShow] = useState(false)

  const { user, setUser, unauthorize } = useContext(LoginContext)

  const logout = () => {
    setShow(false)
    unauthorize()
  }

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'))
      if (userData) {
        setUser(userData)
      } else {
        setUser(null)
      }
    } catch (e) {
      setUser(null)
      console.error(e)
    }
  }, [])

  return (
    <>
      <Row className="bg-primary bg-gradient py-2 text-center text-white px-3">
        <Col xs={6} className="ps-0">
          <Link to={'/'}>
            <Image src={imageLogo} className="logo-home d-block" />
          </Link>
        </Col>
        {user ? (
          <Col xs={6} className="d-flex justify-content-end">
            <div className="d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="d-flex align-items-center py-1 px-2 border-0 bg-transparent"
                >
                  <PiDotsThreeVerticalBold className="fs-5" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {user.esAdmin ? (
                    <>
                      <Dropdown.Item
                        as={Link}
                        to={'/administrador-marcablanca'}
                        className="fw-bold d-flex align-items-center"
                      >
                        <PiUserCircleGearBold className="text-secondary fs-5 me-2" />{' '}
                        Administrar
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        as={Link}
                        to={'/catalogo'}
                        className="fw-bold d-flex align-items-center"
                      >
                        <PiBookOpenBold className="text-primary fs-5 me-2" />{' '}
                        Catálogo
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        as={Link}
                        to={'/configurar-precios'}
                        className="d-flex align-items-center py-2 fw-medium"
                      >
                        <PiEyeBold className="text-secondary fs-5 me-2" />{' '}
                        Configurar visualización
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to={'/lista-de-precios'}
                        className="d-flex align-items-center py-2 fw-medium"
                      >
                        <PiFileBold className="text-secondary fs-5 me-2" />{' '}
                        Lista de precio
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      {user.clientes.subscriptions?.estado === 'active' && (
                        <>
                          <Dropdown.Item
                            as={Link}
                            to={'/catalogo'}
                            className="fw-bold d-flex align-items-center"
                          >
                            <PiBookOpenBold className="text-primary fs-5 me-2" />{' '}
                            Catálogo
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            as={Link}
                            to={'/configurar-precios'}
                            className="d-flex align-items-center py-2 fw-medium"
                          >
                            <PiEyeBold className="text-secondary fs-5 me-2" />{' '}
                            Configurar visualización
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to={'/lista-de-precios'}
                            className="d-flex align-items-center py-2 fw-medium"
                          >
                            <PiFileBold className="text-secondary fs-5 me-2" />{' '}
                            Lista de precio
                          </Dropdown.Item>
                        </>
                      )}
                    </>
                  )}
                  <Dropdown.Item
                    as={Link}
                    to={'/mi-cuenta'}
                    className="d-flex align-items-center py-2 fw-medium"
                  >
                    <PiGearBold className="text-secondary fs-5 me-2" /> Mi
                    cuenta
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={'/contacto'}
                    className="d-flex align-items-center py-2 fw-medium"
                  >
                    <PiNoteBold className="text-secondary fs-5 me-2" /> Contacto
                  </Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => setShow(true)}
                    className="d-flex align-items-center py-2 fw-medium"
                  >
                    <PiXCircleBold className="text-secondary fs-5 me-2" />{' '}
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
