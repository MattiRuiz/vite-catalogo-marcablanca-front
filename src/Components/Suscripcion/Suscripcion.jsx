import { useState } from 'react'

import { Col, Row } from 'react-bootstrap'
const Suscripcion = () => {
  const [plan, setPlan] = useState('mensual')
  return (
    <Row className="justify-content-center justify-content-md-around align-items-center alto-container">
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
                plan === 'mensual' ? 'bg-primary text-white' : ''
              }`}
              onClick={() => setPlan('mensual')}
            >
              Mensual
            </button>
            <button
              id="anual"
              className={`fw-bold texto-14 px-3 py-2 rounded-5 ${
                plan === 'anual' ? 'bg-primary text-white' : ''
              }`}
              onClick={() => setPlan('anual')}
            >
              Anual
            </button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default Suscripcion
