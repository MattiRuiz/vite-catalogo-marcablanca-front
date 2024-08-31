import { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import TallasCRUD from './TallasCRUD/TallasCRUD'
import TipoProductoCRUD from './TipoProductos_CRUD/TipoProductoCRUD'
import MarcasCRUD from './Marcas_CRUD/MarcasCRUD'
import ProductosCRUD from './Productos_CRUD/ProductosCRUD'
import ClientesCRUD from './Clientes_CRUD/ClientesCRUD'
import NotFound from '../NotFound/NotFound'

import { Tostada } from '../../ui'

const Admin = () => {
  const [selectedEntity, setSelectedEntity] = useState('productos')

  const user = localStorage.getItem('userData')
  const userParsed = JSON.parse(user)
  const auth = userParsed.esAdmin

  const [toastConfig, setToastConfig] = useState({
    show: false,
    variant: 'danger',
    header: '',
    message: '',
  })

  const handleShowToast = (variant, header, message) => {
    setToastConfig({
      show: true,
      variant,
      header,
      message,
    })
  }

  return (
    <>
      {auth === 1 ? (
        <>
          <Row className="justify-content-center gap-3 bg-secondary-subtle alto-container">
            <Col lg={2} className="d-none d-lg-flex border-end py-5">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link
                    className="fw-medium"
                    onClick={() => setSelectedEntity('medidas')}
                  >
                    Medidas
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="fw-medium"
                    onClick={() => setSelectedEntity('tipo de producto')}
                  >
                    Tipo de producto
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="fw-medium"
                    onClick={() => setSelectedEntity('marcas')}
                  >
                    Marcas
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="fw-medium"
                    onClick={() => setSelectedEntity('productos')}
                  >
                    Productos
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="fw-medium"
                    onClick={() => setSelectedEntity('clientes')}
                  >
                    Clientes
                  </Link>
                </li>
              </ul>
            </Col>
            <Col xs={12} sm={11} md={10} lg={9} className="py-5">
              <Col xs={12} className="">
                <h6 className="fw-bold text-primary mb-0">
                  Panel de Administración
                </h6>
                <h2 className="display-3 fw-bold lh-sm">
                  Lista de {selectedEntity}
                </h2>
                <Form.Group className="d-lg-none mb-3">
                  <Form.Label className="" htmlFor="entity">
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
              <Col xs={12}>
                {selectedEntity === 'medidas' && (
                  <TallasCRUD showToast={handleShowToast} />
                )}
                {selectedEntity === 'tipo de producto' && (
                  <TipoProductoCRUD showToast={handleShowToast} />
                )}
                {selectedEntity === 'marcas' && (
                  <MarcasCRUD showToast={handleShowToast} />
                )}
                {selectedEntity === 'productos' && (
                  <ProductosCRUD showToast={handleShowToast} />
                )}
                {selectedEntity === 'clientes' && (
                  <ClientesCRUD showToast={handleShowToast} />
                )}
              </Col>
            </Col>
          </Row>
          {toastConfig.show && (
            <Tostada
              show={toastConfig.show}
              onClose={() => setToastConfig({ ...toastConfig, show: false })}
              header={toastConfig.header}
              variant={toastConfig.variant}
            >
              {toastConfig.message}
            </Tostada>
          )}
        </>
      ) : (
        <NotFound></NotFound>
      )}
    </>
  )
}

export default Admin
