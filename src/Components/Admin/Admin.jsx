import { useState, useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

import LoginProvider from '../../Context/LoginContext';

import TallasCRUD from "./CRUDS/TallasCRUD/TallasCRUD";
import TipoProductoCRUD from "./CRUDS/TipoProductos_CRUD/TipoProductoCRUD";
import MarcasCRUD from "./CRUDS/Marcas_CRUD/MarcasCRUD";
import ProductosCRUD from "./CRUDS/Productos_CRUD/ProductosCRUD";
import ClientesCRUD from "./CRUDS/Clientes_CRUD/ClientesCRUD";
import ProductosTallasCRUD from "./CRUDS/ProductosTallas_CRUD/ProductosTallasCRUD";
import NotFound from "../404/NotFund";


const Admin = () => {
  const [selectedEntity, setSelectedEntity] = useState("tallas");
  const { auth } = useContext(LoginProvider)

  return (
   <>
{console.log(auth)}

   {
    auth?
    <Container className="py-4">
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
            <option value="productosTallas">Productos-Tallas</option>
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
      {selectedEntity === "productosTallas" && <ProductosTallasCRUD />}
    </Row>
  </Container>
  :

  <NotFound>

  </NotFound>
  }
   </>
  );
};

export default Admin;
