import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  InputGroup,
} from "react-bootstrap";

function ListaPrecio() {
  const [show, setShow] = useState(false);
  const [ganancia, setGanancia] = useState(0);
  const [showGanancia, setShowGanancia] = useState(false);



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleValor = (e) => {
    setGanancia(e.target.value)
  }
  const handleShowGanacia = (e) => {
    console.log(e.target.checked)
    setShowGanancia(e.target.checked)
    console.log(showGanancia)

  }

  const   mostrarPrecios = () => {
    localStorage.setItem('ganancia', (ganancia))
    localStorage.setItem('showGanancia',(showGanancia))

    console.log(showGanancia)
    setShow(false)
  }
  const dataSave = () => {
    setGanancia(localStorage.getItem('ganancia'))
    setShowGanancia(  localStorage.getItem('showGanancia').toLowerCase?.() === 'true')
    setShow(false)
  }
  useEffect(() => {
    dataSave();
  },[])
  
  console.log(showGanancia)
  return (
    <Container fluid className="bg-white pb-5 pt-4">
      <Row>
        <Col xs={12}>
          <h4>Lista de precios</h4>
          <p>Descarga la lista de precios en formato PDF</p>
          <Button href="https://api-catalogo-tvqn.onrender.com/opt/render/project/src/uploads/lista_de_productos.pdf" download >Descargar PDF</Button>
        </Col>
        <Col xs={12} className="mt-4">
          <h4>Activar precios en el catálogo</h4>
          <Form>
            <Form.Label className="mb-3">
              Permite activar los precios en el catálogo. Indique un porcentaje
              de ganancia que se aplicará a los precios mostrados.
            </Form.Label>
            <Row>
              <Col>
                <InputGroup className="mb-2">
                <InputGroup.Text>%</InputGroup.Text>
              <Form.Control onChange={(e) => handleValor(e)} value={ganancia} type="number" placeholder="Ingrese un valor" />
                </InputGroup></Col>
              <Col>
            <Form.Check onChange={(e) => handleShowGanacia(e)} checked={showGanancia} type="switch" label="Mostrar precios" />
              </Col>
            </Row>
          </Form>
          <Button className="mt-3" onClick={handleShow}>
            Aplicar cambios
          </Button>
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
          <Button
            onClick={ mostrarPrecios }
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListaPrecio;