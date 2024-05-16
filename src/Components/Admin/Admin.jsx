import { useState } from 'react'
import { Container, Row, Col, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import TallasCRUD from './CRUDS/TallasCRUD/TallasCRUD'
import TipoProductoCRUD from './CRUDS/TipoProductos_CRUD/TipoProductoCRUD'
import MarcasCRUD from './CRUDS/Marcas_CRUD/MarcasCRUD'
import ProductosCRUD from './CRUDS/Productos_CRUD/ProductosCRUD'
import ClientesCRUD from './CRUDS/Clientes_CRUD/ClientesCRUD'
import NotFound from '../404/NotFund'

const Admin = () => {
  const [selectedEntity, setSelectedEntity] = useState('productos')

  const user = localStorage.getItem('userData')
  const userParsed = JSON.parse(user)
  const auth = userParsed.esAdmin

  return (
    <>
      {auth === 1 ? (
        <Container fluid className="py-4 bg-primario alto-container">
          <Row className="justify-content-end">
            <Col lg={2} className="d-none d-lg-flex fixed-top  margin-menu">
              <ul
                className="list-unstyled fs-5"
                style={{ letterSpacing: '.5px' }}
              >
                <li className="mb-2">
                  <Link
                    className="text-white fw-medium"
                    onClick={() => setSelectedEntity('medidas')}
                  >
                    Medidas
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="text-white fw-medium"
                    onClick={() => setSelectedEntity('tipo de producto')}
                  >
                    Tipo de producto
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="text-white fw-medium"
                    onClick={() => setSelectedEntity('marcas')}
                  >
                    Marcas
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="text-white fw-medium"
                    onClick={() => setSelectedEntity('productos')}
                  >
                    Productos
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="text-white fw-medium"
                    onClick={() => setSelectedEntity('clientes')}
                  >
                    Clientes
                  </Link>
                </li>
              </ul>
            </Col>
            <Col xs={12} lg={9} className="me-lg-5">
              <h6 className="mb-2 texto-primario bg-white rounded fw-bold d-inline-block px-2 py-1 text-uppercase ">
                Panel de Administración
              </h6>
              <h2 className="text-white">Lista de {selectedEntity}</h2>
              <Form.Group className="d-lg-none mb-3">
                <Form.Label className="text-white" htmlFor="entity">
                  Selecciona una seccion:
                </Form.Label>
                <Form.Select
                  id="entity"
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                >
                  <option value="medidas">Medidas</option>
                  <option value="tipo de producto">Tipo de Producto</option>
                  <option value="marcas">Marcas</option>
                  <option value="productos">Productos</option>
                  <option value="clientes">Clientes</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} lg={9} className="me-lg-5">
              {selectedEntity === 'medidas' && <TallasCRUD />}
              {selectedEntity === 'tipo de producto' && <TipoProductoCRUD />}
              {selectedEntity === 'marcas' && <MarcasCRUD />}
              {selectedEntity === 'productos' && <ProductosCRUD />}
              {selectedEntity === 'clientes' && <ClientesCRUD />}
            </Col>
          </Row>
        </Container>
      ) : (
        <NotFound></NotFound>
      )}
    </>
  )
}

export default Admin
