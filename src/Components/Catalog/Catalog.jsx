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
  Alert,
} from 'react-bootstrap'

import { getAllProductos } from '../../Functions/ProductosFunctions'
import { getProductosPorCategoria } from '../../Functions/ProductosFunctions'

import CardLoading from './CardLoading'

function Catalog() {
  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const handleShow = () => setShowAlert(true)

  const [imagenErrors, setImagenErrors] = useState({})
  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  const { id } = useParams()

  const baseUrl = import.meta.env.VITE_NAME

  //#region GANANCIAS/PRECIOS
  const showGanancia = localStorage.getItem('showGanancia')
  let ganancia = 1
  let porcentual = 1.0

  if (showGanancia) {
    const gananciaStr = localStorage.getItem('ganancia')
    ganancia = JSON.parse(gananciaStr)
    porcentual = (ganancia + 100) / 100
  }
  //#endregion

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (id) {
          const response = await getProductosPorCategoria(id)
          setProducts(response.data)
          if (!response.data.length) handleShow()
        } else {
          const response = await getAllProductos()
          setProducts(response.data)
          if (!response.data.length) handleShow()
        }
      } catch (e) {
        console.log(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <Container fluid className="bg-white py-4">
      <Button variant="Light" as={Link} to={'/welcome'} className="py-3 ps-0">
        <span className="material-symbols-outlined">arrow_back</span>
      </Button>
      {loading ? (
        <Row className="justify-content-start my-3 g-3">
          <CardLoading />
          <CardLoading />
        </Row>
      ) : (
        <></>
      )}
      <Row className="justify-content-start my-3 g-3">
        {products.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={4} xl={3} className="mb-2">
            <Card className="mb-3 h-100">
              <Ratio aspectRatio="4x3" className="fondo-imagen">
                {imagenErrors[product.id] ? (
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                    <p className="mb-0 color-grisclaro">
                      <strong>Sin imágen</strong>
                    </p>
                  </div>
                ) : (
                  <Card.Img
                    alt={product.nombre}
                    variant="top"
                    src={baseUrl + product.rutaImagen}
                    onError={() => handleImageError(product.id)}
                  />
                )}
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
        <Col xs={12} md={10} lg={8} className="d-block mx-auto">
          <Alert variant="warning" className="mb-5" show={showAlert}>
            <Alert.Heading className="fs-6">
              <strong>Ups!</strong>
            </Alert.Heading>
            No se han encontrado resultados para esta categoría
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default Catalog
