import { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  InputGroup,
} from 'react-bootstrap'

function ListaPrecio() {
  const [show, setShow] = useState(false)
  const [ganancia, setGanancia] = useState(0)
  const [showGanancia, setShowGanancia] = useState(false)

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
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} lg={8} className="py-5">
          <h3 className="fw-bold">Panel de control</h3>
          <p className="mb-1">
            Aquí encontrará todas las opciones relacionadas a los precios de los
            productos.
          </p>
          <Col xs={12} className="mt-3 border rounded p-4">
            <h4>Activar precios en el catálogo *</h4>
            <Form className="my-3">
              <p>
                Permite activar los precios en el catálogo. Si indica un
                porcentaje de ganancia de 0 podrá ver el precio mayorista.
                Recuerde que los precios pueden variar a los publicados.
              </p>
              <Form.Check
                onChange={(e) => handleShowGanacia(e)}
                checked={showGanancia}
                type="switch"
                label="Mostrar precios"
              />
            </Form>
            <Form>
              <Form.Label>Porcentaje de ganancia:</Form.Label>
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
          {/* <Col xs={12} className="border rounded p-4 mt-4">
          <h4>Lista de precios *</h4>
          <p>Descarga la lista de precios en formato PDF</p>
          <Button
            href="https://api-catalogo-tvqn.onrender.com/opt/render/project/src/uploads/lista_de_productos.pdf"
            download
          >
            Descargar PDF
          </Button>
        </Col> */}
          <p className="texto-14 fst-italic mt-3 mb-0">
            * Los precios pueden variar y están sujetos a cambio.
          </p>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Atención!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de mostrar los precios en el catálogo?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={mostrarPrecios}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default ListaPrecio
