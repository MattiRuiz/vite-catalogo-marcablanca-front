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

import ModalCambiarPassword from './ModalCambiarPassword'
import Footer from '../Footer/Footer'

import { VscFilePdf } from 'react-icons/vsc'
import PDFIcon from '../../Images/pdf.png'

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
              <Button className="mt-3" onClick={handleShow}>
                Aplicar cambios
              </Button>
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
              <p className="text-muted">
                Los precios están actualizados al momento de descargar la lista
                y se encuentran sujetos a cambio.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="pt-5">
          <h3 className="fw-bold mb-3">Otras configuraciones</h3>
          <Col xs={12} lg={6}>
            <div className="p-4 rounded border">
              <h4 className="fw-semibold ">Cambiar la contraseña</h4>
              <p className="mb-0">
                Para cambiar la contraseña, haga clic en el siguiente botón y
                rellene el formulario:
              </p>
              <Button
                className="mt-3"
                onClick={() => setModalCambiarPass(true)}
              >
                Cambiar la contraseña
              </Button>
            </div>
          </Col>
        </Row>
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
      </Container>
      <Footer />{' '}
    </>
  )
}

export default Configuraciones
