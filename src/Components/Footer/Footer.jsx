import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <Container>
      <Row className="text-center py-3 text-white">
        <Col>
          <p>
            Creado por <strong>NombrePiolita</strong>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
