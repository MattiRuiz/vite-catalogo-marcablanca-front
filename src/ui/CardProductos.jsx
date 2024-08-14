import {
  Row,
  Col,
  Image,
  Ratio,
  Spinner,
  Card,
  Badge,
  Button,
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

//falta solucionar el manejo de el error de la imagen

const CardProductos = ({ producto }) => {
  return (
    <Col key={producto.id} xs={12} sm={6} lg={3} className="mb-4">
      <Link onClick={() => openPopUpCarrusel(producto)}>
        <Card className="mb-3 h-100">
          <Ratio aspectRatio="4x3" className="fondo-imagen">
            {imagenErrors[producto.id] ? (
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <p className="mb-0 color-grisclaro">
                  <strong>Sin imágen</strong>
                </p>
              </div>
            ) : (
              <Card.Img
                className="object-fit-cover"
                alt={producto.nombre}
                variant="top"
                src={producto.rutaImagen}
                onError={() => handleImageError(producto.id)}
              />
            )}
          </Ratio>
          <Card.Body className="pb-0">
            <Badge className="mb-2">{producto.marcas.nombre}</Badge>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Subtitle className="text-muted pb-3 fst-italic">
              {producto.descripcion}
            </Card.Subtitle>
            {producto.tallas
              .filter((talla) => talla.stock == 1)
              .map((talla, index) => (
                <div key={index}>
                  <p className="border-bottom mb-0 texto-14 text-uppercase fw-bold text-gray">
                    {talla.nombre ? talla.nombre : 'Medidas'}
                  </p>
                  <ul
                    key={index}
                    className="list-unstyled d-flex justify-content-between align-items-center mb-2"
                  >
                    <li className="text-muted lh-sm">{talla.dimensiones}</li>
                  </ul>
                </div>
              ))}
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}

export default CardProductos
