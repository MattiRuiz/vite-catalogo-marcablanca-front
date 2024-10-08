import { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Button,
  Form,
  Modal,
  InputGroup,
  Container,
  Image,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import PDFIcon from '../../Images/pdf.png'

import { Boton } from '../../ui'

function Precios() {
  const [show, setShow] = useState(false)
  const [ganancia, setGanancia] = useState(0)
  const [showGanancia, setShowGanancia] = useState(false)
  const navigate = useNavigate()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleValor = (e) => {
    if (!e.target.value) {
      setGanancia(0)
    } else {
      setGanancia(e.target.value)
    }
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

  const userData = localStorage.getItem('userData')
  const user = JSON.parse(userData)

  useEffect(() => {
    dataSave()
  }, [])

  return (
    <>
      <Container className="py-5">
        <Row className="justify-content-center">
          <h3 className="fw-bold">Precios</h3>
          <p className="mb-3">
            Descarga la lista de precio o modifica la configuración de tu
            catálogo digital.
          </p>
          <Col xs={12} lg={6}>
            <div className="p-4 border rounded">
              <h4 className="fw-semibold">Activar precios en el catálogo</h4>
              <Form className="">
                <p className="mb-0">
                  Permite mostrar los precios de los productos en el catálogo:
                </p>
                <Form.Check
                  onChange={(e) => handleShowGanacia(e)}
                  checked={showGanancia}
                  type="switch"
                  label="Mostrar precios"
                  className="mt-2 mb-4 fw-semibold"
                />
              </Form>
              <Form>
                <Form.Label>Porcentaje de ganancia:</Form.Label>
                <Row className="align-items-center">
                  <Col xs={12} sm={4}>
                    <InputGroup>
                      <InputGroup.Text>%</InputGroup.Text>
                      <Form.Control
                        onChange={(e) => handleValor(e)}
                        value={ganancia}
                        type="number"
                        placeholder="Ingrese un valor"
                        disabled={!showGanancia}
                      />
                    </InputGroup>
                  </Col>
                  <Form.Text className="text-muted mt-2">
                    Si indicas un porcentaje de ganancia de 0, podrás ver el{' '}
                    <strong>precio mayorista.</strong>
                  </Form.Text>
                </Row>
              </Form>
              <Boton className="mt-3" onClick={handleShow} type="button">
                Aplicar cambios
              </Boton>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="p-4 rounded border mt-2 mt-lg-0 h-100">
              <h4 className="fw-semibold">Lista de precios</h4>
              <p>Descarga la lista de precios actualizada en formato PDF.</p>
              <Button
                href={`https://catalogo-marcablanca.s3.sa-east-1.amazonaws.com/Lista_de_productos.pdf`}
                download
                target="_blank"
                className="mb-2"
                variant="outline-primary"
              >
                <Image
                  src={PDFIcon}
                  style={{ width: '50px' }}
                  className="me-3"
                />
                Descargar PDF
              </Button>
              <p className="text-muted mb-0">
                Los precios están actualizados al momento de descargar la lista
                y se encuentran sujetos a cambio.
              </p>
            </div>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header className="border-0 bg-warning" closeButton>
            <Modal.Title>¡Atención!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showGanancia ? (
              <>
                <p className="mb-2">
                  Estás a punto de mostrar los precios en el catálogo. El precio
                  a mostrar está configurado como:
                </p>
                <ul>
                  <li>
                    <h5 className="mb-0">
                      <strong>
                        {' '}
                        {ganancia === '0'
                          ? 'Precio mayorista'
                          : `Precio revendedor con un ${ganancia}% de ganancia`}
                      </strong>
                    </h5>
                  </li>
                </ul>
              </>
            ) : (
              <p className="mb-0">
                Estás a punto de <strong>ocultar</strong> los precios en el
                catálogo. ¿Deseas continuar?
              </p>
            )}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Boton variant="secondary" onClick={handleClose}>
              Cancelar
            </Boton>
            <Boton variant="warning" onClick={mostrarPrecios}>
              Aceptar
            </Boton>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

export default Precios
