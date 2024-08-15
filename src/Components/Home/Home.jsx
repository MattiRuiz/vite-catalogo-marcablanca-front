import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import maschico from '../../Images/maschico.jpg'
import analitico from '../../Images/analitico.png'
import analisis from '../../Images/analisis.png'
import negocios from '../../Images/negocios-en-linea.png'
import reporte from '../../Images/reporte-de-negocios.png'

import LoginContext from '../../Context/LoginContext'

import { PiArrowRightBold } from 'react-icons/pi'

function Home() {
  const { checkUser } = useContext(LoginContext)

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      <Row className="text-center shadow-sm py-3 justify-content-center align-items-center px-2 px-md-0">
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          className="p-0 text-white d-flex flex-column justify-content-center rounded overflow-hidden"
        >
          <Image src={maschico} fluid className="animated-image " />
        </Col>
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={5}
          className="py-4 text-start ms-lg-2 ms-xl-5"
        >
          <p className="mb-2 border d-inline-block px-3 py-1 rounded-5 fw-semibold">
            ¡Atención revendedores!
          </p>
          <h5
            className="display-3 lh-1 fw-bold mb-4"
            style={{ fontStretch: 'condensed' }}
          >
            Impulsa tu negocio con nuestro catálogo digital
          </h5>
          <p className="fs-5">
            Accedé a los{' '}
            <span className="fw-bold text-primary opacity-75">
              productos disponibles
            </span>
            , sus fotos, precio y disponibilidad al momento.
          </p>
          <div className="d-flex gap-2">
            <Button
              as={Link}
              to={'/suscripciones'}
              className="bg-gradient border-0"
            >
              Suscripciones
            </Button>
            <Button
              as={Link}
              to={'/welcome'}
              variant="light"
              className="d-flex align-items-center"
            >
              Ver ventajas <PiArrowRightBold className="ms-2" />
            </Button>
          </div>
        </Col>
      </Row>
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
    </>
  )
}

export default Home
