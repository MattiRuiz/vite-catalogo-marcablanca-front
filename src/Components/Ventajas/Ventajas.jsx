import { Image, Row, Col, Ratio } from 'react-bootstrap'
import { Helmet } from 'react-helmet'

import stock from '../../Images/stock.jpg'
import fotos from '../../Images/banco-de-fotos.jpg'
import lista from '../../Images/lista-de-precio.jpg'
import reventa from '../../Images/precio-reventa.jpg'

function Ventajas() {
  return (
    <>
      <Helmet>
        <title>Ventajas | Catálogo Marca Blanca</title>
        <link
          rel="canonical"
          href="https://www.blanqueriamarcablanca.com/catalogo/"
        />
        <meta
          name="description"
          content="Conocé las ventajas que te trae el catálogo de productos de Marca Blanca."
        />
        <meta
          name="keywords"
          content="blanquería, marca blanca, catálogo, mayorista, ventajas, fotos, stock, lista de precio, revendedores"
        />
      </Helmet>
      <Row className="justify-content-center align-items-center align-items-stretch py-5 ">
        <Col xs={12} lg={10} className="text-center mb-4">
          <h6 className="fw-bold text-primary">Ventajas</h6>
          <h1 className="display-3 fw-bold lh-1">
            Accedé a nuestro catálogo y disfruta de todos sus beneficios
          </h1>
        </Col>
        <Row className="text-center justify-content-evenly overflow-hidden">
          <Col xs={12} sm={6} lg={3} className="card-container mb-3 mb-lg-0">
            <div className="d-flex flex-column align-items-center bg-white h-100 border rounded-4 pb-2">
              <Ratio aspectRatio="1x1" className="mb-4">
                <Image src={stock} className="rounded-top-4 border-bottom" />
              </Ratio>
              <div className="px-4">
                <h4 className="fw-bold">Consulta disponibilidad</h4>
                <p>Encuentra todos los productos disponibles en tiempo real.</p>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={3} className="card-container mb-3 mb-lg-0">
            <div className="d-flex flex-column align-items-center bg-white h-100 border rounded-4 pb-2">
              <Ratio aspectRatio="1x1" className="mb-4">
                <Image src={fotos} className="rounded-top-4 border-bottom" />
              </Ratio>
              <div className="px-4">
                <h4 className="fw-bold">Banco de fotos</h4>
                <p>
                  Con múltiples fotos para una mejor presentación a tus
                  clientes.
                </p>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={3} className="card-container mb-3 mb-lg-0">
            <div className="d-flex flex-column align-items-center bg-white h-100 border rounded-4 pb-2">
              <Ratio aspectRatio="1x1" className="mb-4">
                <Image src={lista} className="rounded-top-4 border-bottom" />
              </Ratio>
              <div className="px-4">
                <h4 className="fw-bold">Lista de precios</h4>
                <p>Descarga al instante la lista de precios actualizada.</p>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={3} className="card-container mb-3 mb-lg-0">
            <div className="d-flex flex-column align-items-center bg-white h-100 border rounded-4 pb-2">
              <Ratio aspectRatio="1x1" className="mb-4">
                <Image src={reventa} className="rounded-top-4 border-bottom" />
              </Ratio>
              <div className="px-4">
                <h4 className="fw-bold">Precios de reventa</h4>
                <p>
                  Configura tu cuenta y muestra los precios de los productos a
                  tus clientes.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Row>
    </>
  )
}

export default Ventajas
