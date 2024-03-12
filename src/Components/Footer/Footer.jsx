import { Row, Col, Image } from 'react-bootstrap'

import imageLogo from '../../Images/logo-marca.svg'

function Footer() {
  return (
    <>
      <Row className="pb-5 pt-4 text-white shadow bg-primario">
        <Col xs={12} className="text-center">
          <Image src={imageLogo} className="logo-home d-block mx-auto mb-2" />
          <ul className="list-unstyled">
            <li>San Luis 1917</li>
            <li>Rosario - Santa Fe</li>
            <li>(0341) 4212690</li>
          </ul>
          <h4>Horario de atención</h4>
          <p>Lunes a viernes de 9:00 a 18:00h</p>
        </Col>
      </Row>
    </>
  )
}

export default Footer
