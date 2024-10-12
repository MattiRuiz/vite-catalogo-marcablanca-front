import { Row, Col, Image } from 'react-bootstrap'

import { Boton } from '../../ui'

import PDFIcon from '../../Images/pdf.png'

const ListaDePrecio = () => {
  return (
    <>
      <Row className="py-5 px-2 px-md-0 justify-content-center">
        <Col xs={12} md={10} lg={5}>
          <h1>Lista de precios</h1>
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
      </Row>
    </>
  )
}

export default ListaDePrecio
