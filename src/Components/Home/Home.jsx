import { useContext, useEffect } from 'react'
import { Container, Row, Col, Button, Ratio, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import empresasLogo from '../../Images/logos-empresas.jpg'
import catalogo from '../../Images/mockup_catalogo.png'
import Footer from '../Footer/Footer'

import LoginContext from '../../Context/LoginContext'

function Home() {
  const { checkUser } = useContext(LoginContext)

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <Container fluid>
      <Row className="text-center">
        <Col
          xs={12}
          lg={6}
          className="p-5 text-white bg-primario d-flex flex-column justify-content-center"
        >
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
        <Col xs={12} lg={6} className="text-center bg-white p-4 p-md-5">
          <p className="fs-4 lh-sm">
            Con los mejores precios en las <strong>siguientes marcas:</strong>
          </p>
          <Row className="justify-content-center">
            <Col xs={11} md={8}>
              <Image src={empresasLogo} fluid />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center align-items-stretch">
        <Col
          xs={11}
          md={8}
          lg={6}
          className="text-center py-5 text-white bg-primario"
          id="contacto"
        >
          <p className="fs-4">Encontranos en:</p>
          <Row className="justify-content-center">
            <Col xs={11} sm={9} lg={8} xl={7}>
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
                    {
                      'position:relative;text-align:right;width:100%;height:400px;'
                    }
                    .gmap_canvas{' '}
                    {
                      'overflow:hidden;background:none!important;width:100%;height:400px;'
                    }
                    .gmap_iframe {'height:400px!important;'}
                  </style>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={6} className="bg-white py-5">
          <Row className="text-center justify-content-center">
            <Col xs={8}>
              <Image src={catalogo} fluid />
            </Col>
            <Col xs={10}>
              <h4>¡Nuevo catálogo digital!</h4>
              <p>Suscribite a Marca Blanca y llevá tu catalogo en el celular</p>
            </Col>
            <Col xs={11}>
              <Button as={Link} to={'/welcome'}>
                Ver catálogo
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}

export default Home
