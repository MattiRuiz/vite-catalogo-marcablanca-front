import { Col } from 'react-bootstrap'

import { PiShovelFill } from 'react-icons/pi'

const HomeAdmin = () => {
  return (
    <Col xs={12}>
      <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
        <h2 className="mb-0 fw-bold">Inicio</h2>
      </div>
      <div className="p-3 bg-white">
        <div
          className="p-5 rounded text-center"
          style={{
            border: '1px dashed var(--bs-border-color)',
          }}
        >
          <PiShovelFill className="fs-1 text-muted mb-2" />
          <h5 className="text-muted fw-semibold">Inicio en construcción</h5>
          <p className="mb-0">
            <em>
              La idea es colocar tipo un Dashboard, y en esta sección se
              encuentren cosas útiles como últimos registros, mensajería
              interna, estadísticas como visitantes diários, etc.
            </em>
          </p>
        </div>
      </div>
    </Col>
  )
}

export default HomeAdmin
