import { useContext, useEffect } from 'react'
import { Container, Row, Col, Button, Ratio, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import maschico from '../../Images/maschico.jpg'
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
      <Row className="text-center shadow-sm">
        <Col
          xs={12}
          lg={6}
          className="p-0 text-white bg-primario d-flex flex-column justify-content-center"
        >
          <Image src={maschico} fluid />
        </Col>
        <Col xs={12} lg={6} className="py-5 d-flex align-items-center">
          <Row className="text-center justify-content-center">
            <Col xs={10}>
              <h5 className="display-5 mb-1">
                <strong>¡Bienvenidos!</strong>
              </h5>
              <h4 className="lh-sm">
                A la versión <span className="text-danger fw-bold">Beta</span>{' '}
                de nuestro <strong>catálogo digital</strong>
              </h4>
              <p>Con él podras llevar tu catalogo a todas partes.</p>
            </Col>
            <Col xs={11}>
              <Button as={Link} to={'/welcome'}>
                Ver catálogo
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="bg-secondary text-white p-2">
          <p className="mb-0">
            ¡Accedé a las <strong>mejores ofertas</strong>!
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center align-items-stretch py-5">
        <Col xs={12} lg={12} className="text-center mb-4">
          <p className="fs-4 lh-sm">
            Accedé a nuestro catálogo y disfruta de todos sus{' '}
            <strong>beneficios:</strong>
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
              className="bg-primario d-flex text-white rounded-circle justify-content-center align-items-center mb-3"
            >
              <span class="material-symbols-outlined fs-2">dashboard</span>
            </div>
            <h5>Consultar stock</h5>
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
              className="bg-primario d-flex text-white rounded-circle justify-content-center align-items-center mb-3"
            >
              <span class="material-symbols-outlined fs-2">image</span>
            </div>
            <h5>Banco de fotos</h5>
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
              className="bg-primario d-flex text-white rounded-circle justify-content-center align-items-center mb-3"
            >
              <span class="material-symbols-outlined fs-2">view_list</span>
            </div>
            <h5>Lista de precios</h5>
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
              className="bg-primario d-flex text-white rounded-circle justify-content-center align-items-center mb-3"
            >
              <span class="material-symbols-outlined fs-2">price_check</span>
            </div>
            <h5>Precios revendedor</h5>
            <p>
              Configurá tu cuenta y comenzá a mostrar los precios revendedor en
              tu catálogo.
            </p>
          </Col>
          <Col xs={12} lg={12} className="text-center mt-2">
            <p className="fs-5 lh-sm">
              Junto a los mejores precios y la mejor atención{' '}
              <strong>¡te esperamos!</strong>
            </p>
          </Col>
        </Row>
      </Row>
      <Footer />
    </Container>
  )
}

export default Home
