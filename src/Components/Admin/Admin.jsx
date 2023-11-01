import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

import TallasCRUD from "./CRUDS/TallasCRUD";
import TipoProductoCRUD from "./CRUDS/TipoProductoCRUD";
import MarcasCRUD from "./CRUDS/MarcasCRUD";
import ProductosCRUD from "./CRUDS/ProductosCRUD";
import ClientesCRUD from "./CRUDS/ClientesCRUD";

const Admin = () => {
  const [selectedEntity, setSelectedEntity] = useState("tallas");

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col xs={12}>
          <h1 className="mb-4 text-white">Panel de Administración</h1>
          <Form.Group>
            <Form.Label className="text-white" htmlFor="entity">
              Selecciona una seccion:
            </Form.Label>
            <Form.Select
              id="entity"
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
            >
              <option value="tallas">Tallas</option>
              <option value="tipo-producto">Tipo de Producto</option>
              <option value="marcas">Marcas</option>
              <option value="productos">Productos</option>
              <option value="clientes">Clientes</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {selectedEntity === "tallas" && <TallasCRUD />}
        {selectedEntity === "tipo-producto" && <TipoProductoCRUD />}
        {selectedEntity === "marcas" && <MarcasCRUD />}
        {selectedEntity === "productos" && <ProductosCRUD />}
        {selectedEntity === "clientes" && <ClientesCRUD />}
      </Row>
    </Container>
  );
};

export default Admin;
