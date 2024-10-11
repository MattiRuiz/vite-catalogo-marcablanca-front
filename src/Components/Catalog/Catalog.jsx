import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
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

import { PiFadersBold, PiArrowCircleRightBold } from 'react-icons/pi'

import { CardLoading, CardProducto } from '../../ui'

function Catalog() {
  const { id } = useParams()
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [productos, setProductos] = useState()
  const [title, setTitle] = useState('Todos los productos')
  const [activeCategory, setActiveCategory] = useState()
  const [showGanancia, setShowGanancia] = useState(false)
  const [ganancia, setGanancia] = useState(1.0)
  const navigate = useNavigate()

  // const showGanancia = localStorage.getItem('showGanancia')
  // let ganancia = 1
  // let porcentual = 1.0

  // if (showGanancia == 'true') {
  //   const gananciaStr = localStorage.getItem('ganancia')
  //   ganancia = JSON.parse(gananciaStr)
  //   porcentual = (ganancia + 100) / 100
  // }

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
    setProductos(respuesta.data)
    setTitle(respuesta.data[0].tipo_producto)
    setActiveCategory(value)
  }

  const handleProducts = async (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top
    setProductos('')
    const response = await getProductosCatalogo(pageNumber)
    setTotalPaginas(response.data.totalPaginas)
    setProductos(response.data)
    setTitle('Todos los productos')
    setActiveCategory(null)
  }

  const userData = localStorage.getItem('userData')
  const user = JSON.parse(userData)

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true)
      const response = await getAllTipoProductos()
      setCategorias(response.data)
      setLoading(false)
    }

    if (user.esAdmin || user.clientes.subscriptions.estado === 'active') {
      fetchCategorias()

      if (id) {
        handleCategories(id)
      } else {
        handleProducts(1)
      }
    } else {
      navigate('/mi-cuenta')
    }

    // fetchCategorias()

    if (id) {
      handleCategories(id)
    } else {
      handleProducts(1)
    }

    const localGanancia = JSON.parse(localStorage.getItem('showGanancia'))
    if (localGanancia) {
      setShowGanancia(localGanancia)
      let valorGanancia = JSON.parse(localStorage.getItem('ganancia'))
      let porcentual = (valorGanancia + 100) / 100
      setGanancia(porcentual)
    }
  }, [])

  return (
    <>
      <Row className="py-4 justify-content-center gap-3">
        {/* <div className="d-lg-none mb-4">
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
                      Todos los productos
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
          </div> */}
        <Col lg={2} className="d-none d-lg-flex flex-column border-end py-2">
          <h5 className="fw-bold mb-0">
            Hola {user.clientes?.nombre ? user.clientes.nombre : user.username}
          </h5>
          <p className="texto-14 text-muted border-bottom pb-2">Bienvenido</p>
          <p className="texto-14 text-muted mb-2">Menú</p>
          {!loading ? (
            <ul className="list-unstyled">
              <li className="">
                <Link
                  className={`py-1 mb-1 d-flex  ${
                    activeCategory === null ? 'fw-semibold ' : ''
                  }`}
                  onClick={() => handleProducts(1)}
                >
                  Todos los productos
                </Link>
              </li>
              {categorias.map((categoria) => (
                <li key={categoria.id} value={categoria.id}>
                  <Link
                    className={`py-1 mb-1 d-flex  ${
                      activeCategory === categoria.id ? 'fw-semibold ' : ''
                    }`}
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
        <Col xs={12} md={11} lg={9} className="py-3">
          <div className="border-bottom mb-3">
            {productos ? (
              <h2 className="mb-2 fw-bold">{title}</h2>
            ) : (
              <h2 className="mb-2">
                <Placeholder xs={5} md={3} xl={2} />
              </h2>
            )}
          </div>
          <Row>
            {productos ? (
              productos.map((producto) => (
                <Col key={producto.id} xs={12} sm={6} lg={4} className="mb-4">
                  <CardProducto
                    producto={producto}
                    showGanancia={showGanancia}
                    ganancia={ganancia}
                  />
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
    </>
  )
}

export default Catalog
