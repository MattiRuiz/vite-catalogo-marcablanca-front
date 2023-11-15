import { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Image, Button, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import LoginContext from '../../Context/LoginContext'

import MenuOffline from './MenuOffline'
import MenuLoged from './MenuLoged'
import imageLogo from '../../Images/logo-marca.svg'

function Navbar() {
  const { auth } = useContext(LoginContext)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleOpen = () => setShow(true)

  const [menu, setMenu] = useState()

  useEffect(() => {
    const close = () => handleClose()
    if (auth) {
      setMenu(<MenuLoged close={close} />)
    } else {
      setMenu(<MenuOffline close={close} />)
    }
  }, [auth])

  useEffect(() => {
    handleClose()
  }, [menu])

  return (
    <Container fluid>
      <Row className="bg-primario py-3 text-center text-white px-3 shadow">
        <Col xs={6}>
          <Link to={'/'}>
            <Image src={imageLogo} className="logo-home d-block" />
          </Link>
        </Col>
        <Col xs={6} className="d-flex align-items-center">
          <Button className="d-block ms-auto" onClick={handleOpen}>
            <span className="material-symbols-outlined">menu</span>
          </Button>
        </Col>
      </Row>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        {menu}
      </Offcanvas>
    </Container>
  )
}
export default Navbar
