import { useContext, useEffect } from 'react'
import { Container, Row, Col, Button, Ratio, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import maschico from '../../Images/maschico.jpg'
import analitico from '../../Images/analitico.png'
import analisis from '../../Images/analisis.png'
import negocios from '../../Images/negocios-en-linea.png'
import reporte from '../../Images/reporte-de-negocios.png'
import Footer from '../Footer/Footer'

import LoginContext from '../../Context/LoginContext'

function Home() {
  const { checkUser } = useContext(LoginContext)

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <Container fluid>
      <Row className="text-center shadow-sm">
        <Col
          xs={12}
          lg={6}
          className="p-0 text-white bg-primario d-flex flex-column justify-content-center"
        >
          <Image src={maschico} fluid />
        </Col>
        <Col
          xs={12}
          lg={6}
          className="py-5 d-flex align-items-center justify-content-center"
        >
          <Row className="text-center justify-content-center">
            <Col xs={10}>
              <h5
                className="display-5 mb-1 fw-bold"
                style={{ fontStretch: 'condensed' }}
              >
                <strong>¡Bienvenidos!</strong>
              </h5>
              <h4 className="lh-sm mb-1">
                A la versión <span className="text-danger fw-bold">Beta</span>{' '}
                de nuestro <strong>catálogo digital</strong>
              </h4>
              <p>
                Con él podras llevar tu catalogo a todas partes, ver fotos,
                precios y más...
              </p>
            </Col>
            <Col xs={11}>
              <Button as={Link} to={'/welcome'}>
                Ver catálogo
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="bg-secondary text-white p-2 fs-5">
          <p className="mb-0 fw-light" style={{ letterSpacing: '.75px' }}>
            ¡El mejor precio{' '}
            <span className="fw-medium">en el rubro blanco!</span>
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center align-items-stretch py-5">
        <Col xs={12} lg={12} className="text-center mb-4">
          <p className="fs-4 lh-sm mb-1">
            Accedé a nuestro catálogo y disfruta de todos{' '}
            <strong>sus beneficios</strong>
          </p>
        </Col>
        <Row className="text-center justify-content-evenly">
          <Col
            xs={12}
            md={6}
            lg={3}
            xl={2}
            className="d-flex flex-column align-items-center"
          >
            <div
              style={{ width: '80px', height: '80px' }}
              className="d-flex text-white justify-content-center align-items-center mb-3"
            >
              <Image src={analitico} fluid />
            </div>
            <h4 className="fw-bold" style={{ fontStretch: 'condensed' }}>
              Consultar stock
            </h4>
            <p>
              Los productos que no se encuentran disponibles no se muestran en
              el catálogo.
            </p>
          </Col>
          <Col
            xs={12}
            md={6}
            lg={3}
            xl={2}
            className="d-flex flex-column align-items-center"
          >
            <div
              style={{ width: '80px', height: '80px' }}
              className="d-flex text-white justify-content-center align-items-center mb-3"
            >
              <Image src={analisis} fluid />
            </div>
            <h4 className="fw-bold" style={{ fontStretch: 'condensed' }}>
              Banco de fotos
            </h4>
            <p>
              Cada producto cuenta con varias fotos para mostrar a tus clientes.
            </p>
          </Col>
          <Col
            xs={12}
            md={6}
            lg={3}
            xl={2}
            className="d-flex flex-column align-items-center"
          >
            <div
              style={{ width: '80px', height: '80px' }}
              className="d-flex text-white justify-content-center align-items-center mb-3"
            >
              <Image src={reporte} fluid />
            </div>
            <h4 className="fw-bold" style={{ fontStretch: 'condensed' }}>
              Lista de precios
            </h4>
            <p>Descargá en el momento la lista de precios actualizada.</p>
          </Col>
          <Col
            xs={12}
            md={6}
            lg={3}
            xl={2}
            className="d-flex flex-column align-items-center"
          >
            <div
              style={{ width: '80px', height: '80px' }}
              className="d-flex text-white justify-content-center align-items-center mb-3"
            >
              <Image src={negocios} fluid />
            </div>
            <h4 className="fw-bold" style={{ fontStretch: 'condensed' }}>
              Precios revendedor
            </h4>
            <p>
              Configurá tu cuenta y comenzá a mostrar los precios revendedor en
              tu catálogo.
            </p>
          </Col>
        </Row>
      </Row>
      <Footer />
    </Container>
  )
}

export default Home
