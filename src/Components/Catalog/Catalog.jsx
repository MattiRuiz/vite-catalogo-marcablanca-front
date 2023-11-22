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
  const [products, setProducts] = useState([])

  const { id } = useParams()

  const baseUrl = import.meta.env.VITE_NAME

  const showGanancia = localStorage.getItem('showGanancia')
  let ganancia = 1
  let porcentual = 1.0

  if (showGanancia) {
    const gananciaStr = localStorage.getItem('ganancia')
    ganancia = JSON.parse(gananciaStr)
    porcentual = (ganancia + 100) / 100
  }

  const productosStorage = JSON.parse(localStorage.getItem('listaProductos'))
  const productCatStorage = JSON.parse(
    localStorage.getItem('listaProductosCat')
  )
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          if (productCatStorage === null) {
            const response = await getProductosPorCategoria(id)
            setProducts(response.data)
            localStorage.setItem(
              'listaProductosCat',
              JSON.stringify({ idCat: id, data: response.data })
            )
            return
          } else if (productCatStorage.idCat != id) {
            const response = await getProductosPorCategoria(id)
            setProducts(response.data)
            localStorage.setItem(
              'listaProductosCat',
              JSON.stringify({ idCat: id, data: response.data })
            )
            return
          } else {
            setProducts(productCatStorage.data)
            return
          }
        }

        if (productosStorage === null) {
          const response = await getAllProductos()
          setProducts(response.data)
          localStorage.setItem('listaProductos', JSON.stringify(response.data))
          return
        } else {
          setProducts(productosStorage)
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
                          <>
                            {showGanancia == 'true' ? (
                              <li key={index}>
                                <strong>{talla.talla}:</strong>{' '}
                                {talla.dimensiones} a $
                                {parseInt(talla.precio) * porcentual}
                              </li>
                            ) : (
                              <li key={index}>
                                <strong>{talla.talla}:</strong>{' '}
                                {talla.dimensiones}
                              </li>
                            )}
                          </>
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
