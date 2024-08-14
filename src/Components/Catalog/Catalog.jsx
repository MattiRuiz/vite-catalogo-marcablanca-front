import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Row,
  Col,
  Ratio,
  Card,
  Placeholder,
  Pagination,
  Spinner,
  Nav,
  Accordion,
} from 'react-bootstrap'

import {
  getProductosCatalogo,
  getProductosPorCategoria,
} from '../../Functions/ProductosFunctions'
import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'

import CardLoading from './CardLoading'
import PopUpCarousel from './PopUpCarousel'
import { PiFadersBold, PiArrowCircleRightDuotone } from 'react-icons/pi'

function Catalog() {
  const { id } = useParams()
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [productos, setProductos] = useState()
  const [title, setTitle] = useState('Todos los productos')
  const [imagenErrors, setImagenErrors] = useState({})
  const [activeCategory, setActiveCategory] = useState()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [popUpCarrusel, setPopUpCarrusel] = useState(false)

  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  const openPopUpCarrusel = (producto) => {
    setSelectedProduct(producto)
    setPopUpCarrusel(true)
  }

  //ganancias/precios
  const showGanancia = localStorage.getItem('showGanancia')
  let ganancia = 1
  let porcentual = 1.0

  if (showGanancia == 'true') {
    const gananciaStr = localStorage.getItem('ganancia')
    ganancia = JSON.parse(gananciaStr)
    porcentual = (ganancia + 100) / 100
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    handleProducts(pageNumber)
  }

  const handleCategories = async (value) => {
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top
    setProductos('')
    const respuesta = await getProductosPorCategoria(value)
    setTotalPaginas(1)
    setCurrentPage(1)
    setProductos(respuesta.data.productos)
    setTitle(respuesta.data.productos[0].tipo_producto.nombre)
    setActiveCategory(value)
  }

  const handleProducts = async (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top
    setProductos('')
    const response = await getProductosCatalogo(pageNumber)
    setTotalPaginas(response.data.totalPaginas)
    setProductos(response.data.productos)
    setTitle('Todos los productos')
    setActiveCategory(null)
  }

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true)
      const response = await getAllTipoProductos()
      setCategorias(response.data)
      setLoading(false)
    }
    fetchCategorias()

    if (id) {
      handleCategories(id)
    } else {
      handleProducts(1)
    }
  }, [])

  return (
    <>
      <Row className="py-4 justify-content-center">
        <Col xs={12} md={11}>
          <div className="border-bottom">
            {productos ? (
              <h2 className="mb-3 fw-bold">{title}</h2>
            ) : (
              <h2 className="mb-3">
                <Placeholder xs={5} md={3} xl={2} />
              </h2>
            )}
          </div>
          <div className="d-lg-none mb-4">
            <Accordion>
              <Accordion.Header className="">
                <PiFadersBold className="me-2 fs-5" />
                <span className="fw-semibold">Filtros</span>
              </Accordion.Header>
              <Accordion.Body className="px-0 py-2 border-0 ">
                <Nav justify variant="pills" className="justify-content-center">
                  <Nav.Item>
                    <Nav.Link
                      className={`${activeCategory === null ? 'active' : ''}`}
                      style={{ fontWeight: 500 }}
                      onClick={() => handleProducts(1)}
                    >
                      Productos
                    </Nav.Link>
                  </Nav.Item>
                  {categorias.map((categoria) => (
                    <Nav.Item key={categoria.id}>
                      <Nav.Link
                        className={`${
                          activeCategory === categoria.id ? 'active' : ''
                        }`}
                        style={{ fontWeight: 500 }}
                        onClick={() => handleCategories(categoria.id)}
                      >
                        {categoria.nombre}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Accordion.Body>
            </Accordion>
          </div>
          <Row>
            <Col lg={2} className="d-none d-lg-flex">
              {!loading ? (
                <ul className="list-unstyled">
                  <li className="mt-4">
                    <Link
                      className="text-dark px-2 py-1 mb-1 d-flex align-items-center"
                      style={{ fontWeight: 500 }}
                      onClick={() => handleProducts(1)}
                    >
                      <PiArrowCircleRightDuotone
                        className={`me-1 fs-5 text-primary ${
                          activeCategory === null ? 'd-block' : 'd-none'
                        }`}
                      />
                      Productos
                    </Link>
                  </li>
                  {categorias.map((categoria) => (
                    <li key={categoria.id} value={categoria.id}>
                      <Link
                        className={`text-dark px-2 py-1 mb-1 d-flex ${
                          activeCategory === categoria.id ? 'active' : ''
                        }`}
                        style={{ fontWeight: 500 }}
                        onClick={() => handleCategories(categoria.id)}
                      >
                        {activeCategory === categoria.id && (
                          <PiArrowCircleRightDuotone
                            className={`me-1 fs-5 text-primary`}
                          />
                        )}

                        {categoria.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <Spinner className="m-5" animation="border" />
              )}
            </Col>
            {/* <Col xs={12} className="d-lg-none mb-4">
          <Accordion>
            <Accordion.Header className="">
              <PiFadersBold className="me-2 fs-5" />
              <span className="fw-semibold">Filtros</span>
            </Accordion.Header>
            <Accordion.Body className="px-0 py-2 border-0 ">
              <Nav justify variant="pills" className="justify-content-center">
                <Nav.Item>
                  <Nav.Link
                    className={`${activeCategory === null ? 'active' : ''}`}
                    style={{ fontWeight: 500 }}
                    onClick={() => handleProducts(1)}
                  >
                    Productos
                  </Nav.Link>
                </Nav.Item>
                {categorias.map((categoria) => (
                  <Nav.Item key={categoria.id}>
                    <Nav.Link
                      className={`${
                        activeCategory === categoria.id ? 'active' : ''
                      }`}
                      style={{ fontWeight: 500 }}
                      onClick={() => handleCategories(categoria.id)}
                    >
                      {categoria.nombre}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Accordion.Body>
          </Accordion>
        </Col> */}
            <Col xs={12} lg={10} className="mt-0 mt-lg-4">
              <Row>
                {productos ? (
                  productos.map((producto) => (
                    <Col
                      key={producto.id}
                      xs={12}
                      sm={6}
                      lg={4}
                      className="mb-4"
                    >
                      <Link onClick={() => openPopUpCarrusel(producto)}>
                        <Card className="mb-3 h-100 border-0">
                          <Ratio
                            aspectRatio="4x3"
                            className="fondo-imagen position-relative rounded-3 shadow"
                          >
                            {imagenErrors[producto.id] ? (
                              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                                <p className="mb-0 color-grisclaro">
                                  <strong>Sin imágen</strong>
                                </p>
                              </div>
                            ) : (
                              <Card.Img
                                className="object-fit-cover rounded-3"
                                alt={producto.nombre}
                                variant="top"
                                src={producto.rutaImagen}
                                onError={() => handleImageError(producto.id)}
                              />
                            )}
                          </Ratio>
                          {producto.marcas.nombre === 'Otros' ? (
                            ''
                          ) : (
                            <p
                              className="mb-0 bg-primary bg-gradient text-white fw-semibold position-absolute top-0 start-0 z-3 mt-2 ms-2 px-2 py-0 rounded-2 shadow-sm"
                              style={{ letterSpacing: '.25px' }}
                            >
                              {producto.marcas.nombre}
                            </p>
                          )}
                          <Card.Body className="pb-0 px-2 pt-2">
                            <Card.Title className="fw-semibold mb-2">
                              {producto.nombre}
                            </Card.Title>
                            <Card.Subtitle
                              className="text-muted mb-2 fst-italic"
                              style={{ lineHeight: '1.3' }}
                            >
                              {producto.descripcion}
                            </Card.Subtitle>
                            {producto.tallas
                              .filter((talla) => talla.stock == 1)
                              .map((talla, index) => (
                                <div key={index}>
                                  <div className="d-flex justify-content-between gap-2 mb-1">
                                    <div className="d-flex justify-content-center flex-column">
                                      {talla.nombre && (
                                        <p className="fw-bold text-uppercase mb-0">
                                          {talla.nombre}
                                        </p>
                                      )}
                                      <p className="mb-0">
                                        {' '}
                                        {talla.dimensiones}
                                      </p>
                                    </div>
                                    <div>
                                      {showGanancia == 'true' ? (
                                        <div className="">
                                          <p className="fw-bold mb-0">
                                            $
                                            {Math.trunc(
                                              parseInt(talla.precio) *
                                                porcentual
                                            )}
                                          </p>
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))
                ) : (
                  <>
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                  </>
                )}
              </Row>
              {productos && (
                <Pagination className="d-flex justify-content-center">
                  {totalPaginas > 1
                    ? Array.from({ length: totalPaginas }, (_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))
                    : ''}
                </Pagination>
              )}
            </Col>
          </Row>
        </Col>
        {/* <Col xs={12} className="d-lg-none mb-4">
          <Accordion>
            <Accordion.Header className="">
              <PiFadersBold className="me-2 fs-5" />
              <span className="fw-semibold">Filtros</span>
            </Accordion.Header>
            <Accordion.Body className="px-0 py-2 border-0 ">
              <Nav justify variant="pills" className="justify-content-center">
                <Nav.Item>
                  <Nav.Link
                    className={`${activeCategory === null ? 'active' : ''}`}
                    style={{ fontWeight: 500 }}
                    onClick={() => handleProducts(1)}
                  >
                    Productos
                  </Nav.Link>
                </Nav.Item>
                {categorias.map((categoria) => (
                  <Nav.Item key={categoria.id}>
                    <Nav.Link
                      className={`${
                        activeCategory === categoria.id ? 'active' : ''
                      }`}
                      style={{ fontWeight: 500 }}
                      onClick={() => handleCategories(categoria.id)}
                    >
                      {categoria.nombre}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Accordion.Body>
          </Accordion>
        </Col> */}
      </Row>
      {popUpCarrusel ? (
        <PopUpCarousel
          producto={selectedProduct}
          closePopUp={() => setPopUpCarrusel(false)}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default Catalog
