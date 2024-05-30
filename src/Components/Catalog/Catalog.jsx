import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Ratio,
  Card,
  Placeholder,
  Badge,
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
import { PiFadersBold } from 'react-icons/pi'

function Catalog() {
  const { id } = useParams()
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [productos, setProductos] = useState()
  const [title, setTitle] = useState('Todos los productos')
  const [imagenErrors, setImagenErrors] = useState({})
  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [popUpCarrusel, setPopUpCarrusel] = useState(false)

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
  }

  const handleProducts = async (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top
    setProductos('')
    const response = await getProductosCatalogo(pageNumber)
    setTotalPaginas(response.data.totalPaginas)
    setProductos(response.data.productos)
    setTitle('Todos los productos')
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
    <Container className="py-4">
      <Row className="mt-4">
        <Col lg={2} className="d-none d-lg-flex">
          {!loading ? (
            <ul className="list-unstyled">
              <li className="border-bottom py-2">
                <Link
                  className="text-dark fs-5"
                  style={{ fontWeight: 500 }}
                  onClick={() => handleProducts(1)}
                >
                  Productos
                </Link>
              </li>
              {categorias.map((categoria) => (
                <li
                  className="border-bottom py-2"
                  key={categoria.id}
                  value={categoria.id}
                >
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
          ) : (
            <Spinner className="m-5" animation="border" />
          )}
        </Col>
        <Col xs={12} className="d-lg-none mb-4">
          <Accordion>
            <Accordion.Header className="">
              <PiFadersBold className="me-2 fs-5" />
              <span className="fw-semibold">Filtros</span>
            </Accordion.Header>
            <Accordion.Body className="px-0 py-2 border-0 ">
              <Nav justify variant="pills" className="justify-content-center">
                <Nav.Item>
                  <Nav.Link
                    className="text-dark"
                    style={{ fontWeight: 500 }}
                    onClick={() => handleProducts(1)}
                  >
                    Productos
                  </Nav.Link>
                </Nav.Item>
                {categorias.map((categoria) => (
                  <Nav.Item key={categoria.id}>
                    <Nav.Link
                      className="text-dark"
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
          {!loading ? <></> : ''}
        </Col>
        <Col xs={12} lg={10}>
          {productos && <h2 className="pb-2 mb-3 border-bottom">{title}</h2>}
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
              <>
                <h2 className="mb-3 border-bottom pb-2">
                  <Placeholder xs={5} md={3} xl={2} />
                </h2>
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
