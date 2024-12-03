import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import imagewebp from '../../Images/1733184166121.webp'

import { Boton } from '../../ui'
import { PiArrowRightBold } from 'react-icons/pi'

function HomeUnlog() {
  return (
    <Row className="text-center py-3 justify-content-center align-items-center px-2 px-md-0">
      <Col
        xs={12}
        sm={10}
        md={8}
        lg={6}
        className="p-0 text-white d-flex flex-column justify-content-center rounded overflow-hidden"
      >
        <Image src={imagewebp} fluid className="animated-image " />
      </Col>
      <Col
        xs={12}
        sm={10}
        md={8}
        lg={6}
        xl={5}
        className="py-4 text-start ms-lg-2 ms-xl-5"
      >
        <p className="mb-3 border d-inline-block px-3 py-1 rounded-5 fw-semibold">
          ¡Atención revendedores!
        </p>
        <h5
          className="display-3 lh-1 fw-bold mb-4"
          style={{ fontStretch: 'condensed' }}
        >
          Impulsa tu negocio con nuestro catálogo digital
        </h5>
        <p className="fs-5">
          Accedé a los{' '}
          <span className="fw-bold text-primary opacity-75">
            productos disponibles
          </span>
          , sus fotos, precio y disponibilidad al momento.
        </p>
        <div className="d-flex gap-2">
          <Boton as={Link} to={'/suscripciones'}>
            Suscripciones
          </Boton>
          <Boton
            as={Link}
            to={'/ventajas'}
            variant="light"
            className="d-flex align-items-center"
          >
            Ver ventajas <PiArrowRightBold className="ms-2" />
          </Boton>
        </div>
      </Col>
    </Row>
  )
}

export default HomeUnlog
