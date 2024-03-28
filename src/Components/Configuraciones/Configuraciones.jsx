import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Modal, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import ModalCambiarPassword from './ModalCambiarPassword'
import Footer from '../Footer/Footer'

function Configuraciones() {
  const [show, setShow] = useState(false)
  const [ganancia, setGanancia] = useState(0)
  const [showGanancia, setShowGanancia] = useState(false)
  const [modalCambiarPass, setModalCambiarPass] = useState(false)
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_NAME

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleValor = (e) => {
    setGanancia(e.target.value)
  }
  const handleShowGanacia = (e) => {
    setShowGanancia(e.target.checked)
  }

  const mostrarPrecios = () => {
    localStorage.setItem('ganancia', ganancia)
    localStorage.setItem('showGanancia', showGanancia)
    setShow(false)
    navigate('/welcome')
  }
  const dataSave = () => {
    const showGananciaCase = localStorage.getItem('showGanancia')
    if (showGananciaCase != null) {
      setGanancia(localStorage.getItem('ganancia'))
      setShowGanancia(showGananciaCase.toLowerCase?.() === 'true')
    } else {
      localStorage.setItem('ganancia', 0)
      localStorage.setItem('showGanancia', false)
    }

    setShow(false)
  }
  useEffect(() => {
    dataSave()
  }, [])

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={11} lg={8} className="py-5">
          <h3 className="fw-bold">Configuraciones</h3>
          <p className="mb-0">
            Recuerde que los precios pueden variar y están sujetos a cambio.
          </p>
          <Col xs={12} className="border rounded p-3 p-lg-4 mt-4">
            <h4 className="fw-bold">Lista de precios</h4>
            <p>Descarga la lista de precios en formato PDF</p>
            <Button
              href={`${baseUrl}/uploads/lista_de_productos.pdf`}
              download
              target="_blank"
            >
              Descargar PDF
            </Button>
          </Col>
          <Col xs={12} className="border rounded p-3 p-lg-4 mt-4">
            <h4 className="fw-bold">Activar precios en el catálogo</h4>
            <Form className="">
              <p>
                Permite mostrar los precios en el{' '}
                <em>catálogo digital Marca Blanca</em>
              </p>
              <Form.Check
                onChange={(e) => handleShowGanacia(e)}
                checked={showGanancia}
                type="switch"
                label="Mostrar precios"
                className="my-3"
              />
            </Form>
            <Form>
              <Form.Label>
                Porcentaje de ganancia:{' '}
                <span className="text-muted texto-14 text-danger">
                  <strong>
                    (Si indica un porcentaje de ganancia de 0 podrá ver el{' '}
                    precio mayorista)
                  </strong>
                </span>
              </Form.Label>
              <Row className="align-items-center my-2">
                <Col xs={12} sm={4}>
                  <InputGroup>
                    <InputGroup.Text>%</InputGroup.Text>
                    <Form.Control
                      onChange={(e) => handleValor(e)}
                      value={ganancia}
                      type="number"
                      placeholder="Ingrese un valor"
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Form>
            <Button className="mt-3" onClick={handleShow}>
              Aplicar cambios
            </Button>
          </Col>
          <Col xs={12} className="border rounded p-3 p-lg-4 mt-4">
            <h4 className="fw-bold ">Cambiar contraseña</h4>
            <p className="mb-0">
              Para cambiar la contraseña haga click en el siguiente botón:
            </p>
            <Button className="mt-3" onClick={() => setModalCambiarPass(true)}>
              Cambiar la contraseña
            </Button>
          </Col>
        </Col>
      </Row>
      <Footer />
      {modalCambiarPass ? (
        <ModalCambiarPassword closePopUp={() => setModalCambiarPass(false)} />
      ) : (
        <></>
      )}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="border-0 bg-warning" closeButton>
          <Modal.Title>¡Atención!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showGanancia ? (
            <>
              <p>
                Está por mostrar los precios en el catálogo, configurado para
                mostrar el:{' '}
              </p>
              <h5>
                <strong>
                  {' '}
                  {ganancia === '0'
                    ? 'Precio mayorista'
                    : `Precio revendedor con %${ganancia} de ganancia`}
                </strong>
              </h5>
            </>
          ) : (
            <p>
              Está por <strong>ocultar</strong> los precios en el catálogo
              ¿Desea continuar?.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="warning" onClick={mostrarPrecios}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Configuraciones
