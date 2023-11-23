import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <Container fluid>
      <Row className="text-center py-3 text-white">
        <Col>
          <p className="label-marca">
            Creado por <strong>Soluciones tecnológicas</strong>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
