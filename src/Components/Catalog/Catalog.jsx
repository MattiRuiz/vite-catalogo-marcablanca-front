import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Ratio,
  Card,
  Button,
  Form,
  Placeholder,
  Badge,
  InputGroup,
  Alert,
} from 'react-bootstrap'

import { getAllProductos } from '../../Functions/ProductosFunctions'

import CardLoading from './CardLoading'
import PopUpCarousel from './PopUpCarousel'

function Catalog() {
  const { id } = useParams()
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const [imagenErrors, setImagenErrors] = useState({})
  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  //Modal
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [popUpCarrusel, setPopUpCarrusel] = useState(false)

  const openPopUpCarrusel = (producto) => {
    setSelectedProduct(producto)
    setPopUpCarrusel(true)
  }

  //#region GANANCIAS/PRECIOS
  const showGanancia = localStorage.getItem('showGanancia')
  const gananciaCheck = localStorage.getItem('ganancia')
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
      } catch (e) {
        console.error(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    setSelectedCategory(id)
  }, [id])

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value === 'all' ? null : e.target.value)
  }

  return (
    <Container className="py-4">
      <Row>
        <Col xs={12} className="d-flex align-items-center">
          <InputGroup>
            <Button as={Link} to={'/welcome'}>
              <span className="material-symbols-outlined">arrow_back</span>
            </Button>
            <Form.Select
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="all">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>

      {loading ? (
        <Row className="justify-content-start my-3 g-3">
          <h3 className="mb-1 border-bottom pb-2">
            <Placeholder xs={5} md={3} xl={2} />
          </h3>
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
        </Row>
      ) : null}

      <Row className="justify-content-start mb-2 mt-2 g-3">
        <Col xs={12}>
          {showGanancia === 'true' && gananciaCheck === '0' ? (
            <Alert variant="danger" className="p-4" dismissible>
              <Alert.Heading className="fs-5">
                <strong>¡Atención!</strong>
              </Alert.Heading>
              <p className="mb-0">
                Actualmente se encuentra mostrando los{' '}
                <strong>precios mayoristas.</strong> Para ocultarlos o para
                mostrar los precios de revendedor haga{' '}
                <Link
                  to={'/configuracion'}
                  className="fw-bold"
                  style={{ color: 'inherit' }}
                >
                  click aquí.
                </Link>
              </p>
            </Alert>
          ) : null}
        </Col>
        {categorias
          .filter(
            (categoria) => !selectedCategory || categoria.id == selectedCategory
          )
          .map((categoria) => (
            <Col key={categoria.id} xs={12} className="mb-1">
              <h2 className="mb-1 border-bottom pb-2">{categoria.nombre}</h2>
              {categoria.productos.length === 0 ||
              categoria.productos.filter((producto) =>
                producto.productos_tallas.some((talla) => talla.stock !== 0)
              ).length === 0 ? (
                <p>
                  <em>No se encontraron productos en esta categoría.</em>
                </p>
              ) : (
                <p></p>
              )}
              <Row>
                {categoria.productos
                  .filter((producto) =>
                    producto.productos_tallas.some((talla) => talla.stock !== 0)
                  )
                  .map((producto) => (
                    <Col
                      key={producto.id}
                      xs={12}
                      sm={6}
                      lg={4}
                      xl={3}
                      className="mb-4"
                    >
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
                            <Badge className="mb-2">
                              {producto.marcas.nombre}
                            </Badge>
                            <Card.Title>{producto.nombre}</Card.Title>
                            <Card.Subtitle className="text-muted pb-3 fst-italic">
                              {producto.descripcion}
                            </Card.Subtitle>
                            {producto.productos_tallas
                              .filter((talla) => talla.stock == 1)
                              .map((talla, index) => (
                                <div key={index}>
                                  <p className="border-bottom mb-0 texto-14 text-uppercase fw-bold text-gray">
                                    {talla.tallas.nombre
                                      ? talla.tallas.nombre
                                      : 'Medidas'}
                                  </p>
                                  <ul
                                    key={index}
                                    className="list-unstyled d-flex justify-content-between align-items-center mb-2"
                                  >
                                    <li className="text-muted lh-sm">
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
                      </Link>
                    </Col>
                  ))}
              </Row>
            </Col>
          ))}
      </Row>
      {popUpCarrusel ? (
        <PopUpCarousel
          producto={selectedProduct}
          closePopUp={() => setPopUpCarrusel(false)}
        />
      ) : (
        <></>
      )}
    </Container>
  )
}

export default Catalog
