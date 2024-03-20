import { useState, useEffect, useContext } from 'react'
import { Offcanvas, Modal, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import LoginContext from '../../Context/LoginContext'

function MenuLoged({ close }) {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState(false)
  const { unauthorize } = useContext(LoginContext)

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }

  const logout = () => {
    setShow(false)
    close()
    unauthorize()
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
          {user ? (
            <li className="mb-3">
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
          <li className="mb-3 d-md-none">
            <Link to={'/'} onClick={close}>
              Inicio
            </Link>
          </li>
          <li className="mb-3 d-md-none">
            <Link to={'/welcome'} onClick={close}>
              Catálogo
            </Link>
          </li>
          <li className="mb-3">
            <Link to={'/configuracion'} onClick={close}>
              Configuraciones
            </Link>
          </li>
          <li className="mb-3">
            <Link onClick={handleShow}>
              <strong>Cerrar sesión</strong>
            </Link>
          </li>
        </ul>
      </Offcanvas.Body>
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
          <Button onClick={logout}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default MenuLoged
