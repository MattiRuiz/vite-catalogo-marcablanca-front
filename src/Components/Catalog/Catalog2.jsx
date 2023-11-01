import {
  Container,
  Row,
  Col,
  Ratio,
  Card,
  Badge,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

import img1 from "./acolchado-estampadoexo.jpg";
import img2 from "./acolchado-estampadoexo.jpg";

function Catalog2() {
  return (
    <Container fluid className="bg-white pb-5 pt-4">
      <Row>
        <Col xs={12}>
          <InputGroup>
            <Form.Control type="text" placeholder="Buscar" />
            <Button variant="secondary" size="sm" className="boton-buscar">
              <span className="material-symbols-outlined">search</span>
            </Button>
          </InputGroup>

          <p className="text-end mb-1 mt-2">Filtros</p>
        </Col>
        <Col className="mb-3">
          <h3>Acolchados</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mb-2">
          <Card className="mb-3">
            <Ratio aspectRatio="4x3">
              <Card.Img variant="top" src={img1} />
            </Ratio>
            <Card.ImgOverlay>
              <Badge className="fs-6">105</Badge>
            </Card.ImgOverlay>
            <Card.Body className="pb-1">
              <Card.Title>
                <Badge className="fs-6 me-2">105</Badge>
                Acolchado estampado
              </Card.Title>
              <Card.Text>
                <ul className="list-unstyled">
                  <li>
                    <em>
                      Acolchado de microfibra reversible relleno de vellón
                    </em>
                  </li>
                  <ul className="list-unstyled pt-2 ps-2">
                    <li>
                      <strong>1 1/2:</strong> 1,60x2,40 mts
                    </li>
                    <li>
                      <strong>2 1/2:</strong> 2,20x2,40 mts
                    </li>
                  </ul>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} className="mb-2">
          <Card className="mb-3">
            <Ratio aspectRatio="4x3">
              <Card.Img variant="top" src={img2} />
            </Ratio>
            <Card.ImgOverlay>
              <Badge className="fs-6">106</Badge>
            </Card.ImgOverlay>
            <Card.Body className="pb-1">
              <Card.Title>
                <Badge className="fs-6 me-2">106</Badge>Acolchado Pierre Cardín
              </Card.Title>
              <ul className="list-unstyled">
                <li>
                  <em>
                    <strong>100% algodón</strong> | Relleno de vellón siliconado
                  </em>
                </li>
                <ul className="list-unstyled pt-2">
                  <li>
                    <strong>1 1/2:</strong> 1,60x2,40 mts
                  </li>
                  <li>
                    <strong>2 1/2:</strong> 2,20x2,40 mts
                  </li>
                  <li>
                    <strong>King:</strong> 2,50x2,70 mts
                  </li>
                </ul>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default Catalog2;
