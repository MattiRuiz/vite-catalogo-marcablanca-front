import { Row, Col, Image } from 'react-bootstrap'

import {
  PiEnvelopeOpenFill,
  PiWhatsappLogoBold,
  PiCityBold,
  PiMapPinLineBold,
} from 'react-icons/pi'

import imageLogo from '../../Images/logo-marca.svg'

function Footer() {
  return (
    <>
      <Row className="py-5 text-white bg-primario">
        <Col
          xs={12}
          className="d-flex flex-column flex-sm-row justify-content-start justify-content-sm-around ms-5 ms-sm-0"
        >
          <Image src={imageLogo} className="mb-2" style={{ width: '150px' }} />
          <div>
            <h6 className="text-uppercase">Dónde estamos</h6>
            <ul
              className="list-unstyled fw-light"
              style={{ letterSpacing: '.5px' }}
            >
              <li className="d-flex align-items-center">
                <PiMapPinLineBold className="me-2" /> San Luis 1927
              </li>
              <li className="d-flex align-items-center">
                <PiCityBold className="me-2" />
                Rosario, Santa Fe
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-uppercase">Contacto</h6>
            <ul
              className="list-unstyled fw-light"
              style={{ letterSpacing: '.5px' }}
            >
              <li className="d-flex align-items-center">
                <PiEnvelopeOpenFill className="me-2" />
                email@marcablanca.com.ar
              </li>
              <li className="d-flex align-items-center">
                <PiWhatsappLogoBold className="me-2" />
                341-3278887
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Footer
