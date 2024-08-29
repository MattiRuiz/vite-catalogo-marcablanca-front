import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { PiCheckCircleDuotone } from 'react-icons/pi'

import { Boton } from '../../ui'

const Suscripcion = () => {
  const [plan, setPlan] = useState('mensual')
  return (
    <Row className="justify-content-center justify-content-md-around align-items-center alto-container py-5">
      <Col xs={11} sm={8}>
        <div className="text-center">
          <h6 className="fw-bold text-primary">Suscripciones</h6>
          <h1 className="display-3 fw-bold lh-1">
            Suscripciones para todos los bolsillos
          </h1>
          <p>
            Las suscripciones se encuentran adecuadas dependiendo de su
            funcionalidad.
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex gap-1 border p-1 rounded-5">
            <button
              id="mensual"
              className={`fw-bold texto-14 px-3 py-2 rounded-5 ${
                plan === 'mensual'
                  ? 'bg-primary bg-gradient text-white'
                  : 'bg-white'
              }`}
              onClick={() => setPlan('mensual')}
            >
              Mensual
            </button>
            <button
              id="anual"
              className={`fw-bold texto-14 px-3 py-2 rounded-5 ${
                plan === 'anual'
                  ? 'bg-primary bg-gradient text-white'
                  : 'bg-white'
              }`}
              onClick={() => setPlan('anual')}
            >
              Anual
            </button>
          </div>
        </div>
      </Col>
      <Col xs={12}>
        <Row className="mt-3 justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4} xl={3} className="mb-3 mb-lg-0">
            <div className="border rounded-4 p-4 h-100">
              <h5 className="fw-bold">Básico</h5>
              <p>Lo esencial para el revendedor. Gestiona y administra.</p>
              <div className="d-flex align-items-end mb-3">
                <h1 className="mb-0 fw-semibold display-5">
                  ${plan === 'mensual' ? '2.000' : '20.000'}
                </h1>
                <p className="mb-1 ms-1 fw-bold fs-5">
                  al {plan === 'mensual' ? 'mes' : 'año'}
                </p>
              </div>
              <Boton className="w-100" as={Link} to="/contacto">
                Comprar plan
              </Boton>
              <ul className="list-unstyled mt-4">
                <li className="mb-3 d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-primary me-2" />{' '}
                  Acceso al catálogo
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-primary me-2" />{' '}
                  Muestra fotos de productos
                </li>
                <li className="d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-primary me-2" />{' '}
                  Lista de precios actualizada
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4} xl={3} className="mb-3 mb-lg-0">
            <div className="border rounded-4 p-4 h-100">
              <h5 className="fw-bold">Completo</h5>
              <p>La mejor herramienta al alcance de tu celular.</p>
              <div className="d-flex align-items-end mb-3">
                <h1 className="mb-0 fw-semibold display-5">
                  ${plan === 'mensual' ? '3.000' : '28.000'}
                </h1>
                <p className="mb-1 ms-1 fw-bold fs-5">
                  al {plan === 'mensual' ? 'mes' : 'año'}
                </p>
              </div>
              <Boton className="w-100" as={Link} to="/contacto">
                Comprar plan
              </Boton>
              <ul className="list-unstyled mt-4">
                <li className="mb-3 d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-primary me-2" />{' '}
                  Acceso al catálogo
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-primary me-2" />{' '}
                  Muestra fotos de productos
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-primary me-2" />{' '}
                  Lista de precios actualizada
                </li>
                <li className="d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-primary me-2" />{' '}
                  Muestra los precios en el catálogo
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} sm={8} md={6} lg={4} xl={3} className="mb-3 mb-lg-0">
            <div className="border rounded-4 p-4 bg-dark bg-gradient text-white h-100">
              <h5 className="fw-bold">Pack revendedores</h5>
              <p>Controla hasta 5 cuentas, ideal para grupos de reventa.</p>
              <div className="d-flex align-items-end mb-3">
                <h1 className="mb-0 fw-semibold display-5">
                  ${plan === 'mensual' ? '5.000' : '45.000'}
                </h1>
                <p className="mb-1 ms-1 fw-bold fs-5">
                  al {plan === 'mensual' ? 'mes' : 'año'}
                </p>
              </div>
              <Boton variant="light" className="w-100">
                Proximamente...
              </Boton>
              <ul className="list-unstyled mt-4">
                <li className="mb-3 d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-danger me-2" />{' '}
                  Acceso al catálogo
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-danger me-2" />{' '}
                  Muestra fotos de productos
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-danger me-2" />{' '}
                  Lista de precios actualizada
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-danger me-2" />{' '}
                  Muestra los precios en el catálogo
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-danger me-2" />{' '}
                  Gestiona 5 cuentas
                </li>
                <li className="d-flex align-items-center">
                  <PiCheckCircleDuotone className="fs-5 text-danger me-2" />{' '}
                  Administra margen de ganancia
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Col>
      <div className="mt-4">
        <p className="text-center mb-0">
          * Al suscribirte aceptas los{' '}
          <Link to={'/terminos-y-condiciones'} className="fw-bold text-primary">
            Términos y Condiciones.
          </Link>
        </p>
      </div>
    </Row>
  )
}

export default Suscripcion
