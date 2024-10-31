import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { Boton } from '../../ui'

import PDFIcon from '../../Images/pdf.png'
import listaGrande from '../../Images/lista-grande.jpg'

const ListaDePrecio = () => {
  return (
    <>
      <Row className="py-5 px-2 px-md-0 justify-content-center align-items-center gap-3">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Image src={listaGrande} fluid rounded className="border" />
        </Col>
        <Col xs={11} sm={8} md={6} lg={5}>
          <h1 className="fw-bold">Lista de precios</h1>
          <p>
            Descarga la lista de precios actualizada en{' '}
            <strong>formato PDF</strong>.
          </p>

          <Boton
            href={`https://catalogo-marcablanca.s3.sa-east-1.amazonaws.com/Lista_de_productos.pdf`}
            download
            target="_blank"
            variant="primary"
          >
            <Image src={PDFIcon} style={{ width: '50px' }} className="me-3" />
            Ver lista de precios
          </Boton>
        </Col>
        <Col xs={11} md={8} lg={7} className="mt-3 border-top pt-3">
          <p className="fst-italic texto-14 text-center">
            Les recordamos que la lista de precios puede no estar actualizada y
            variar con respecto a los precios en nuestro local. Para más
            información ingrese a los{' '}
            <Link
              to={'/terminos-y-condiciones'}
              className="fw-bold text-primary"
            >
              Términos y condiciones
            </Link>
            .
          </p>
        </Col>
      </Row>
    </>
  )
}

export default ListaDePrecio
