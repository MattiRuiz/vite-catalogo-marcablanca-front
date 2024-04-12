import { useState } from 'react'
import { Container, Row, Col, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import TallasCRUD from './CRUDS/TallasCRUD/TallasCRUD'
import TipoProductoCRUD from './CRUDS/TipoProductos_CRUD/TipoProductoCRUD'
import MarcasCRUD from './CRUDS/Marcas_CRUD/MarcasCRUD'
import ProductosCRUD from './CRUDS/Productos_CRUD/ProductosCRUD'
import ClientesCRUD from './CRUDS/Clientes_CRUD/ClientesCRUD'
import NotFound from '../404/NotFund'
import PopUpEditPrecio from './CRUDS/PopUpEditPrecio'

const Admin = () => {
  const [selectedEntity, setSelectedEntity] = useState('productos')
  const [popUp, setPopUp] = useState(false)

  const user = localStorage.getItem('userData')
  const userParsed = JSON.parse(user)
  const auth = userParsed.esAdmin

  return (
    <>
      {auth === 1 ? (
        <Container fluid className="py-4 bg-primario alto-container">
          <Row className="justify-content-end">
            <Col lg={2} className="d-none d-lg-flex fixed-top  margin-menu">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link
                    className="text-white fw-medium"
                    onClick={() => setSelectedEntity('tallas')}
                  >
                    Medidas
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="text-white fw-medium"
                    onClick={() => setSelectedEntity('tipo-producto')}
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
                <li className="text-white">
                  <Link
                    className="text-white fw-medium"
                    onClick={() => setPopUp(true)}
                  >
                    Aumento en grupo
                  </Link>
                </li>
              </ul>
            </Col>
            <Col xs={12} lg={10}>
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
                  <option value="tallas">Medidas</option>
                  <option value="tipo-producto">Tipo de Producto</option>
                  <option value="marcas">Marcas</option>
                  <option value="productos">Productos</option>
                  <option value="clientes">Clientes</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} lg={10}>
              {selectedEntity === 'tallas' && <TallasCRUD />}
              {selectedEntity === 'tipo-producto' && <TipoProductoCRUD />}
              {selectedEntity === 'marcas' && <MarcasCRUD />}
              {selectedEntity === 'productos' && <ProductosCRUD />}
              {selectedEntity === 'clientes' && <ClientesCRUD />}
              {popUp && (
                <PopUpEditPrecio
                  closePopUp={() => {
                    setPopUp(false)
                  }}
                />
              )}
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
