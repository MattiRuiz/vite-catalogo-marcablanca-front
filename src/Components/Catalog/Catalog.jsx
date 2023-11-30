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
  Form,
  Placeholder,
} from 'react-bootstrap'
import { getAllProductos } from '../../Functions/ProductosFunctions'
import CardLoading from './CardLoading'

function Catalog() {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { id } = useParams() //No se está utilizando
  const baseUrl = import.meta.env.VITE_NAME

  // image error
  const [imagenErrors, setImagenErrors] = useState({})
  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  //#region GANANCIAS/PRECIOS
  const showGanancia = localStorage.getItem('showGanancia')
  let ganancia = 1
  let porcentual = 1.0

  if (showGanancia == 'true') {
    const gananciaStr = localStorage.getItem('ganancia')
    ganancia = JSON.parse(gananciaStr)
    porcentual = (ganancia + 100) / 100
  }
  //#endregion

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await getAllProductos() // Ajusta según tu API
        setCategorias(response.data)
        if (!response.data.length) handleShow()
      } catch (e) {
        console.error(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleShow = () => setShowAlert(true)

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value === 'all' ? null : e.target.value)
  }

  return (
    <Container fluid className="bg-white py-4">
      <Container>
        <Row>
          <Col xs={12} className="d-flex align-items-center">
            <Button
              variant="Light"
              as={Link}
              to={'/welcome'}
              className="ps-0 pe-3"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Button>

            <Form.Select onChange={handleCategoryChange} defaultValue="all">
              <option value="all">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {loading ? (
          <Row className="justify-content-start my-3 g-3">
            <h2>
              <Placeholder xs={5} md={3} />
            </h2>
            <CardLoading />
            <CardLoading />
            <CardLoading />
            <CardLoading />
          </Row>
        ) : null}

        <Row className="justify-content-start mb-2 mt-2 g-3">
          {categorias
            .filter(
              (categoria) =>
                (!selectedCategory || categoria.id == selectedCategory) &&
                categoria.productos.length > 2
            )
            .map((categoria) => (
              <Col key={categoria.id} xs={12} className="mb-1">
                <h2 className="mb-3">{categoria.nombre}</h2>
                <Row>
                  {categoria.productos
                    .filter((producto) => producto.productos_tallas.length > 0)
                    .map((producto) => (
                      <Col
                        key={producto.id}
                        xs={12}
                        sm={6}
                        lg={4}
                        xl={3}
                        className="mb-4"
                      >
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
                                src={baseUrl + producto.rutaImagen}
                                onError={() => handleImageError(producto.id)}
                              />
                            )}
                          </Ratio>
                          <Card.ImgOverlay>
                            <Badge className="fs-6">
                              {categoria.id + producto.id}
                            </Badge>
                          </Card.ImgOverlay>
                          <Card.Body className="pb-0">
                            <Card.Title>{producto.nombre}</Card.Title>
                            <Card.Subtitle className="text-muted pb-3 fst-italic">
                              {producto.descripcion}
                            </Card.Subtitle>
                            {producto.productos_tallas.map((talla, index) => (
                              <div key={index}>
                                <p className="border-bottom mb-1 texto-14 text-uppercase fw-bold text-gray">
                                  {talla.tallas.nombre}
                                </p>
                                <ul
                                  key={index}
                                  className="list-unstyled d-flex justify-content-between align-items-end"
                                >
                                  <li className="text-muted">
                                    {talla.tallas.dimensiones}
                                  </li>
                                  {showGanancia == 'true' ? (
                                    <li className="fw-semibold">
                                      $
                                      {Math.trunc(
                                        parseInt(talla.precio) * porcentual
                                      )}
                                    </li>
                                  ) : (
                                    <></>
                                  )}
                                </ul>
                              </div>
                            ))}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
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
    </Container>
  )
}

export default Catalog
