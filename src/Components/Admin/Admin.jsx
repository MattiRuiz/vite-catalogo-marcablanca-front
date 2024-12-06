import { useState } from 'react'
import { Row, Col, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import HomeAdmin from './HomeAdmin'
import TallasCRUD from './TallasCRUD/TallasCRUD'
import TipoProductoCRUD from './TipoProductos_CRUD/TipoProductoCRUD'
import MarcasCRUD from './Marcas_CRUD/MarcasCRUD'
import ProductosCRUD from './Productos_CRUD/ProductosCRUD'
import ClientesCRUD from './Clientes_CRUD/ClientesCRUD'

import {
  PiUserListBold,
  PiHouseLineBold,
  PiLegoBold,
  PiRulerBold,
  PiTagBold,
  PiXBold,
  PiBriefcaseBold,
  PiListBold,
} from 'react-icons/pi'

import { Tostada } from '../../ui'

const Admin = () => {
  const [selectedEntity, setSelectedEntity] = useState('home')
  const [showOffcanvas, setShowOffcanvas] = useState(false)

  const user = localStorage.getItem('userData')
  const userParsed = JSON.parse(user)

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

  const handleEntity = (entity) => {
    setSelectedEntity(entity)
    setShowOffcanvas(false)
  }

  return (
    <>
      <Helmet>
        <title>Administrador | Catálogo Marca Blanca</title>
      </Helmet>
      <Row className="justify-content-center gap-3 bg-secondary-subtle alto-container py-4">
        <Col lg={2} className="d-none d-lg-flex flex-column border-end py-2">
          <h5 className="fw-bold mb-0">Hola {userParsed.username}</h5>
          <p className="texto-14 text-muted border-bottom pb-2">Bienvenido</p>
          <p className="texto-14 text-muted mb-2">Menú</p>
          <ul className="list-unstyled">
            <li className="mb-3">
              <Link
                className="fw-medium d-flex align-items-center"
                onClick={() => setSelectedEntity('home')}
              >
                <PiHouseLineBold
                  className={`me-2 fs-5 ${
                    selectedEntity === 'home'
                      ? 'text-primary'
                      : 'text-secondary'
                  }`}
                />
                Inicio
              </Link>
            </li>
            <li className="mb-3">
              <Link
                className="fw-medium d-flex align-items-center"
                onClick={() => setSelectedEntity('productos')}
              >
                <PiLegoBold
                  className={`me-2 fs-5 ${
                    selectedEntity === 'productos'
                      ? 'text-primary'
                      : 'text-secondary'
                  }`}
                />
                Productos
              </Link>
            </li>
            <li className="mb-3">
              <Link
                className="fw-medium d-flex align-items-center"
                onClick={() => setSelectedEntity('clientes')}
              >
                <PiUserListBold
                  className={`me-2 fs-5 ${
                    selectedEntity === 'clientes'
                      ? 'text-primary'
                      : 'text-secondary'
                  }`}
                />
                Clientes
              </Link>
            </li>
            <li className="mb-3">
              <Link
                className="fw-medium d-flex align-items-center"
                onClick={() => setSelectedEntity('medidas')}
              >
                <PiRulerBold
                  className={`me-2 fs-5 ${
                    selectedEntity === 'medidas'
                      ? 'text-primary'
                      : 'text-secondary'
                  }`}
                />
                Medidas
              </Link>
            </li>
            <li className="mb-3">
              <Link
                className="fw-medium d-flex align-items-center"
                onClick={() => setSelectedEntity('tipo de producto')}
              >
                <PiTagBold
                  className={`me-2 fs-5 ${
                    selectedEntity === 'tipo de producto'
                      ? 'text-primary'
                      : 'text-secondary'
                  }`}
                />
                Categorías
              </Link>
            </li>
            <li className="mb-3">
              <Link
                className="fw-medium d-flex align-items-center"
                onClick={() => setSelectedEntity('marcas')}
              >
                <PiBriefcaseBold
                  className={`me-2 fs-5 ${
                    selectedEntity === 'marcas'
                      ? 'text-primary'
                      : 'text-secondary'
                  }`}
                />
                Marcas
              </Link>
            </li>
          </ul>
        </Col>
        <Col
          className="d-lg-none position-fixed bottom-0 end-0"
          style={{ zIndex: '4999' }}
        >
          <div className="d-flex justify-content-start mb-3">
            <button
              className={`rounded-circle ${
                showOffcanvas ? 'bg-secondary' : 'bg-primary'
              } bg-gradient text-white shadow ms-1`}
              style={{ width: '55px', height: '55px' }}
              onClick={() => setShowOffcanvas(!showOffcanvas)}
            >
              {showOffcanvas ? (
                <PiXBold className="fs-4" />
              ) : (
                <PiListBold className="fs-4" />
              )}
            </button>
          </div>
        </Col>
        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="start"
          className="d-lg-none"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="pt-0">
            <h5 className="fw-bold mb-0">Hola {userParsed.username}</h5>
            <p className="texto-14 text-muted border-bottom pb-2">Bienvenido</p>
            <p className="texto-14 text-muted mb-2">Menú</p>
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link
                  className="fw-medium d-flex align-items-center"
                  onClick={() => handleEntity('home')}
                >
                  <PiHouseLineBold
                    className={`me-2 fs-5 ${
                      selectedEntity === 'home'
                        ? 'text-primary'
                        : 'text-secondary'
                    }`}
                  />
                  Inicio
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  className="fw-medium d-flex align-items-center"
                  onClick={() => handleEntity('productos')}
                >
                  <PiLegoBold
                    className={`me-2 fs-5 ${
                      selectedEntity === 'productos'
                        ? 'text-primary'
                        : 'text-secondary'
                    }`}
                  />
                  Productos
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  className="fw-medium d-flex align-items-center"
                  onClick={() => setSelectedEntity('clientes')}
                >
                  <PiUserListBold
                    className={`me-2 fs-5 ${
                      selectedEntity === 'clientes'
                        ? 'text-primary'
                        : 'text-secondary'
                    }`}
                  />
                  Clientes
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  className="fw-medium d-flex align-items-center"
                  onClick={() => setSelectedEntity('medidas')}
                >
                  <PiRulerBold
                    className={`me-2 fs-5 ${
                      selectedEntity === 'medidas'
                        ? 'text-primary'
                        : 'text-secondary'
                    }`}
                  />
                  Medidas
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  className="fw-medium d-flex align-items-center"
                  onClick={() => setSelectedEntity('tipo de producto')}
                >
                  <PiTagBold
                    className={`me-2 fs-5 ${
                      selectedEntity === 'tipo de producto'
                        ? 'text-primary'
                        : 'text-secondary'
                    }`}
                  />
                  Categoría
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  className="fw-medium d-flex align-items-center"
                  onClick={() => setSelectedEntity('marcas')}
                >
                  <PiBriefcaseBold
                    className={`me-2 fs-5 ${
                      selectedEntity === 'marcas'
                        ? 'text-primary'
                        : 'text-secondary'
                    }`}
                  />
                  Marcas
                </Link>
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
        <Col xs={12} md={11} lg={9} className="py-3">
          <Col xs={12}>
            {selectedEntity === 'home' && <HomeAdmin />}
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
  )
}

export default Admin
