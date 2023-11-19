import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Ratio,
  Card,
  Badge,
  Button,
} from 'react-bootstrap'

import { getAllProductos } from '../../Functions/ProductosFunctions'
import { getProductosPorCategoria } from '../../Functions/ProductosFunctions'

function Catalog() {
  const { id } = useParams()
  const baseUrl = import.meta.env.VITE_NAME

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getProductosPorCategoria(id)
          setProducts(response.data)
        } else {
          const response = await getAllProductos()
          setProducts(response.data)
        }
      } catch (e) {
        console.log(e.message)
      }
    }

    fetchData()
  }, [])

  return (
    <Container fluid className="bg-white py-4">
      <Button variant="Light" as={Link} to={'/welcome'} className="py-3 ps-0">
        <span className="material-symbols-outlined">arrow_back</span>
      </Button>
      <Row className="justify-content-start my-3 g-3">
        {products.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={4} xl={3} className="mb-2">
            <Card className="mb-3 h-100">
              <Ratio aspectRatio="4x3">
                <Card.Img variant="top" src={baseUrl + product.rutaImagen} />
              </Ratio>
              <Card.ImgOverlay>
                <Badge className="fs-6">{'0' + product.id}</Badge>
              </Card.ImgOverlay>
              <Card.Body className="pb-0">
                <Card.Title>{product.nombre}</Card.Title>
                <Card.Subtitle className="text-muted pb-3">
                  {product.descripcion}
                </Card.Subtitle>
                <Card.Text>
                  <ul className="list-unstyled">
                    {product.productos_tallas
                      ? product.productos_tallas.map((talla, index) => (
                          <li key={index}>
                            <strong>{talla.talla}:</strong> {talla.dimensiones} - ${talla.precio}
                          </li>
                        ))
                      : null}
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Catalog
