import { useState, useEffect, useContext } from 'react'
import { Offcanvas, Modal, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import LoginContext from '../../Context/LoginContext'

function MenuLoged({ close }) {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState(false)
  const { handleLogin } = useContext(LoginContext)

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }

  const logout = () => {
    navigate('/')
    setShow(false)
    close()
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    handleLogin({})
  }

  useEffect(() => {
    const typeUser = JSON.parse(localStorage.getItem('userData'))
    if (typeUser.esAdmin == 1) {
      setUser(true)
    } else {
      setUser(false)
    }
  }, [])

  return (
    <>
      <Offcanvas.Body>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to={'/'} onClick={close}>
              Inicio
            </Link>
          </li>
          <li className="mb-3">
            <Link to={'/welcome'} onClick={close}>
              Catálogo
            </Link>
          </li>
          <li className="mb-3">
            <Link to={'/lista-precios'} onClick={close}>
              Lista de precios
            </Link>
          </li>
          <li className="mb-3">
            <Link onClick={handleShow}>
              <strong>Cerrar sesión</strong>
            </Link>
          </li>
          {user ? (
            <li className="mt-5">
              <Button
                as={Link}
                to={'/admin'}
                variant="secondary"
                onClick={close}
              >
                Administrar
              </Button>
            </li>
          ) : null}
        </ul>
      </Offcanvas.Body>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Atención!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Deseas cerrar sesión?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={logout}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default MenuLoged
