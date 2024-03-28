import { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Image, Button, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LoginContext from '../../Context/LoginContext'

import MenuLoged from './MenuLoged'
import imageLogo from '../../Images/logo-marca.svg'

function Navbar() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)

  const { menu } = useContext(LoginContext)

  return (
    <Container fluid className="shadow">
      <Row className="bg-primario py-3 text-center text-white px-3">
        <Col xs={6} className="ps-0">
          <Link to={'/'}>
            <Image src={imageLogo} className="logo-home d-block" />
          </Link>
        </Col>
        {menu ? (
          <Col xs={6} className="d-flex  justify-content-end">
            <ul className="list-unstyled d-flex mb-0 align-items-center">
              <li className="d-none d-md-inline-block">
                <Link to={'/'} className="text-white px-4 py-2">
                  Inicio
                </Link>
              </li>
              <li className="d-none d-md-inline-block">
                <Link to={'/welcome'} className="text-white px-4 py-2">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link onClick={handleOpen} className="text-white d-flex">
                  <span className="material-symbols-outlined me-0 ps-2 d-none d-md-block">
                    settings
                  </span>
                  <span className="material-symbols-outlined d-none d-md-block">
                    arrow_drop_down
                  </span>
                  <span className="material-symbols-outlined me-0 d-md-none">
                    menu
                  </span>
                </Link>
              </li>
            </ul>
          </Col>
        ) : (
          <Col xs={6} className="d-flex  justify-content-end">
            <ul className="list-unstyled d-flex mb-0 align-items-center">
              <li>
                <Link
                  to={'/login'}
                  className="text-white px-4 py-2 border border-white rounded texto-14"
                >
                  Ingresar
                </Link>
              </li>
            </ul>
          </Col>
        )}
      </Row>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header className="bg-primario text-white mb-3" closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <MenuLoged close={handleClose} />
      </Offcanvas>
    </Container>
  )
}
export default Navbar
