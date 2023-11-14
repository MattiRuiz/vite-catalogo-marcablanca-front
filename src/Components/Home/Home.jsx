import { Container, Row, Col, Button, Ratio, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import empresasLogo from "../../Images/logos-empresas.jpg";
import catalogo from "../../Images/mockup_catalogo.png";

function Home() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} className="px-0">
          {/* <Image src={cartel} fluid /> */}
        </Col>
      </Row>
      <Row className="text-white text-center pb-3 px-3">
        <Col xs={12} className="border-top border-bottom border-white py-3">
          <h5 className="display-5">
            <strong>Mayorista textil</strong>
          </h5>
          <p className="mb-1">En nuestros locales encontrarás:</p>
          <p className="letterspacing">
            <strong>
              Sábanas | Acolchados | Frazadas | Almohadas | Cortinas | Manteles
              | Accesorios para baño | y más...
            </strong>
          </p>
        </Col>
      </Row>
      <Row className="bg-white py-4">
        <Col xs="12" className="text-center">
          <p className="fs-4 lh-sm">
            Con los mejores precios en las <strong>siguientes marcas:</strong>
          </p>
        </Col>
        <Col>
          <Image src={empresasLogo} fluid className="mx-auto d-block" />
        </Col>
      </Row>
      <Row className="text-white justify-content-center py-3">
        <Col xs={11} md={8} lg={5} className="text-center pb-3" id="contacto">
          <p className="fs-4">Encontranos en:</p>
          <div>
            <div className="mapouter">
              <div className="gmap_canvas">
                <Ratio aspectRatio="1x1">
                  <iframe
                    className="gmap_iframe"
                    width="100%"
                    title="Mapa de Blanqueria MarcaBlanca"
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Blanqueria MarcaBlanca&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                </Ratio>
              </div>
              <style>
                .mapouter
                {"position:relative;text-align:right;width:100%;height:400px;"}
                .gmap_canvas{" "}
                {
                  "overflow:hidden;background:none!important;width:100%;height:400px;"
                }
                .gmap_iframe {"height:400px!important;"}
              </style>
            </div>
          </div>
        </Col>
        <Col
          xs={11}
          className="text-center border-top border-bottom border-white pt-3 pb-2"
        >
          <h4>Horario de atención</h4>
          <p>Lunes a viernes de 9:00 a 18:00h</p>
        </Col>
        <Col xs={10} className="pt-3 text-center">
          <h4>Contacto</h4>
          <ul className="list-unstyled">
            <li>
              <span className="material-symbols-outlined">location_on</span>San
              Luis 1917
            </li>
            <li>
              <span className="material-symbols-outlined">map</span>Rosario,
              Santa Fe
            </li>
            <li>
              <span className="material-symbols-outlined">call</span>(0341)
              4212690
            </li>
          </ul>
        </Col>
      </Row>
      <Row className="pt-3 pb-4 text-center justify-content-center bg-white">
        <Col xs={8}>
          <Image src={catalogo} fluid />
        </Col>
        <Col xs={10}>
          <h4>¡Nuevo catálogo digital!</h4>
          <p>Suscribite a Marca Blanca y llevá tu catalogo en el celular</p>
        </Col>
        <Col xs={11}>
          <Button as={Link} to={"/login"} variant="outline-primary">
            Ver catálogo
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
