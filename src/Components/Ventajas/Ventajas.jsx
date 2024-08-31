import { Image } from 'react-bootstrap'

import trabajando from './trabajando.png'

// import analitico from '../../Images/analitico.png'
// import analisis from '../../Images/analisis.png'
// import negocios from '../../Images/negocios-en-linea.png'
// import reporte from '../../Images/reporte-de-negocios.png'

function Ventajas() {
  return (
    <div className="py-5 text-center">
      <Image src={trabajando} className="mb-2" />
      <h1>Próximamente...</h1>
      <p>Nos encontramos trabajando para mejorar la experiencia del usuario.</p>
      {/* <Row className="justify-content-center align-items-center align-items-stretch py-5 bg-claro">
        <Col xs={12} lg={12} className="text-center mb-4">
          <p className="fs-2 lh-sm mb-3 fw-light">
            Accedé a nuestro catálogo y disfruta de todos sus beneficios:
          </p>
        </Col>
        <Row className="text-center justify-content-evenly overflow-hidden">
          <Col xs={12} md={6} lg={3} className="card-container">
            <div className="d-flex flex-column align-items-center bg-white p-5 h-100">
              <div
                style={{ width: '70px', height: '70px' }}
                className="d-flex text-white justify-content-center align-items-center mb-4"
              >
                <Image src={analitico} fluid />
              </div>
              <h4 className="fw-bold mb-1">Consultar stock</h4>
              <p>Encuentra todos los productos disponibles en tiempo real.</p>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="card-container">
            <div className="d-flex flex-column align-items-center bg-white p-5 h-100">
              <div
                style={{ width: '70px', height: '70px' }}
                className="d-flex text-white justify-content-center align-items-center mb-4"
              >
                <Image src={analisis} fluid />
              </div>
              <h4 className="fw-bold mb-1">Banco de fotos</h4>
              <p>
                Cada producto incluye múltiples fotos para una mejor
                presentación a tus clientes.
              </p>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="card-container">
            <div className="d-flex flex-column align-items-center bg-white p-5 h-100">
              <div
                style={{ width: '70px', height: '70px' }}
                className="d-flex text-white justify-content-center align-items-center mb-4"
              >
                <Image src={reporte} fluid />
              </div>
              <h4 className="fw-bold mb-1">Lista de precios</h4>
              <p>Descarga al instante la lista de precios actualizada.</p>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="card-container">
            <div className="d-flex flex-column align-items-center bg-white p-5 h-100">
              <div
                style={{ width: '70px', height: '70px' }}
                className="d-flex text-white justify-content-center align-items-center mb-4"
              >
                <Image src={negocios} fluid />
              </div>
              <h4 className="fw-bold mb-1">Precios de reventa</h4>
              <p>
                Configura tu cuenta y muestra los precios de los productos a tus
                clientes.
              </p>
            </div>
          </Col>
        </Row>
      </Row> */}
    </div>
  )
}

export default Ventajas
