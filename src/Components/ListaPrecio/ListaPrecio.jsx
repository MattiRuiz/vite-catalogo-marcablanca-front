import { useState } from "react";
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid className="bg-white pb-5 pt-4">
      <Row>
        <Col xs={12}>
          <h4>Lista de precios</h4>
          <p>Descarga la lista de precios en formato PDF</p>
          <Button>Descargar PDF</Button>
        </Col>
        <Col xs={12} className="mt-4">
          <h4>Activar precios en el catálogo</h4>
          <Form>
            <Form.Label className="mb-3">
              Permite activar los precios en el catálogo. Indique un porcentaje
              de ganancia que se aplicará a los precios mostrados.
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>%</InputGroup.Text>
              <Form.Control type="number" placeholder="Ingrese un valor" />
            </InputGroup>
            <Form.Check type="switch" label="Mostrar precios" />
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
            onClick={() => {
              alert("ahre que todavia no funciona");
            }}
          >
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListaPrecio;
