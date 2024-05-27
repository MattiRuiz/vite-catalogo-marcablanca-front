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
  Pagination,
} from 'react-bootstrap'

import {
  getProductosCatalogo,
  getProductosPorCategoria,
} from '../../Functions/ProductosFunctions'
import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'

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
  let ganancia = 1
  let porcentual = 1.0

  if (showGanancia == 'true') {
    const gananciaStr = localStorage.getItem('ganancia')
    ganancia = JSON.parse(gananciaStr)
    porcentual = (ganancia + 100) / 100
  }
  //#endregion

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [productos, setProductos] = useState()

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleCategories = async (value) => {
    setProductos('')
    const respuesta = await getProductosPorCategoria(value)
    setTotalPaginas(1)
    setCurrentPage(1)
    setProductos(respuesta.data.productos)
  }

  const fetch = async () => {
    const respuesta = await getProductosCatalogo(currentPage)
    setTotalPaginas(respuesta.data.totalPaginas)
    setProductos(respuesta.data.productos)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllTipoProductos() // Ajusta según tu API
      setCategorias(response.data)
      console.log('categoria', response.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    fetch()
  }, [currentPage])

  return (
    <Container className="py-4">
      <Row className="mt-4">
        <Col lg={3} xl={2} className="d-none d-lg-flex mt-5">
          <ul className="list-unstyled mt-2">
            <li className="border-bottom py-2">
              <Link className="text-dark fs-5" style={{ fontWeight: 500 }}>
                Productos
              </Link>
            </li>
            {categorias.map((categoria) => (
              <li
                className="border-bottom py-2"
                key={categoria.id}
                value={categoria.id}
              >
                {console.log(`categoria ${categoria.id}`, categoria)}
                <Link
                  className="text-dark fs-5"
                  style={{ fontWeight: 500 }}
                  onClick={() => handleCategories(categoria.id)}
                >
                  {categoria.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col xs={12} lg={9} xl={10}>
          <h1 className="mb-3 border-bottom pb-1">Catálogo</h1>
          <Row>
            {productos ? (
              productos.map((producto) => (
                <Col key={producto.id} xs={12} sm={6} lg={4} className="mb-4">
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
                                <li className="text-muted lh-sm">
                                  {talla.dimensiones}
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
              ))
            ) : (
              <Row className="justify-content-start my-3 g-3">
                {/* <h3 className="mb-1 border-bottom pb-2">
                  <Placeholder xs={5} md={3} xl={2} />
                </h3> */}
                <CardLoading />
                <CardLoading />
                <CardLoading />
              </Row>
            )}
          </Row>
          <Pagination>
            {totalPaginas > 0
              ? Array.from({ length: totalPaginas }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))
              : 'loading'}
          </Pagination>
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
