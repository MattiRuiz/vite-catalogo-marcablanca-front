import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Placeholder,
  Pagination,
  Spinner,
  FormControl,
  Ratio,
  Image,
} from 'react-bootstrap'
import { Helmet } from 'react-helmet'

import {
  getProductosCatalogo,
  getProductosPorCategoria,
} from '../../Functions/ProductosFunctions'
import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'

import {
  PiXCircleDuotone,
  PiListDashesBold,
  PiCaretLeftBold,
} from 'react-icons/pi'

import { CardLoading, CardProducto, Boton, BotonSecundario } from '../../ui'

import todosLosProductos from '../../Images/all.webp'

function Catalogo() {
  const { id, page } = useParams()
  const navigate = useNavigate()

  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(Number(page) || 1)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [productos, setProductos] = useState()
  const [title, setTitle] = useState('Todos los productos')
  const [showCategoria, setShowCategoria] = useState(false)

  const [showGanancia, setShowGanancia] = useState(false)
  const [ganancia, setGanancia] = useState(1.0)

  const [imagenErrors, setImagenErrors] = useState({})
  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber)
  //   handleProducts(pageNumber)
  // }

  // const handleCategories = async (value) => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top
  //   setProductos('')
  //   const response = await getProductosPorCategoria(value)
  //   setProductos(response.data.productos)
  //   setTitle(response.data.productos[0].tipo_producto)
  //   setTotalPaginas(response.data.totalPages)
  //   setCurrentPage(parseInt(response.data.actualPage))
  //   setShowCategoria(false)
  // }

  // const handleProducts = async (pageNumber) => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top
  //   setProductos('')
  //   const response = await getProductosCatalogo(pageNumber)
  //   setProductos(response.data.productos)
  //   setTotalPaginas(response.data.totalPages)
  //   setCurrentPage(parseInt(response.data.actualPage))
  //   setTitle('Todos los productos')
  // }

  const fetchProducts = async (categoryId, pageNumber = 1) => {
    setLoading(true)
    try {
      let response
      if (categoryId) {
        response = await getProductosPorCategoria(categoryId, pageNumber)
        setTitle(response.data.productos[0]?.tipo_producto || 'Categoría')
      } else {
        response = await getProductosCatalogo(pageNumber)
        setTitle('Todos los productos')
      }
      setProductos(response.data.productos)
      setTotalPaginas(response.data.totalPages)
      setCurrentPage(pageNumber)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const ocultarPrecios = () => {
    setShowGanancia(false)
    localStorage.setItem('showGanancia', false)
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
    }

    const localGanancia = JSON.parse(localStorage.getItem('showGanancia'))
    if (localGanancia) {
      setShowGanancia(localGanancia)
      let valorGanancia = JSON.parse(localStorage.getItem('ganancia'))
      let porcentual = (valorGanancia + 100) / 100
      setGanancia(porcentual)
    }
  }, [])

  useEffect(() => {
    fetchProducts(id, currentPage)
  }, [id, currentPage])

  const handlePageChange = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage(pageNumber)
    if (id) {
      navigate(`/catalogo/${id}/${pageNumber}`)
    } else {
      navigate(`/catalogo/page/${pageNumber}`)
    }
  }

  const handleCategoryClick = (categoryId) => {
    navigate(`/catalogo/${categoryId}/1`)
  }

  return (
    <>
      <Helmet>
        <title>Catálogo Marca Blanca</title>
        <link
          rel="canonical"
          href="https://www.blanqueriamarcablanca.com/catalogo/"
        />
      </Helmet>
      <Row className="pt-2 pt-lg-4 pb-4 justify-content-center gap-3">
        <Col xs={12} md={11} className="d-lg-none">
          <div className="d-flex justify-content-between border-bottom pb-3 pt-1">
            <Link to="/">
              <BotonSecundario className="pe-3 ps-0 py-2">
                <PiCaretLeftBold className="me-1 fs-5" />
                Volver
              </BotonSecundario>
            </Link>
            <BotonSecundario
              onClick={() => setShowCategoria(!showCategoria)}
              className="ps-3 pe-0 py-2"
            >
              <PiListDashesBold className="me-1 fs-5" /> Categorías
            </BotonSecundario>
          </div>
          {showCategoria && (
            <Col xs={12} sm={11} className="mt-3">
              <div className="d-flex gap-2 flex-wrap">
                <Boton
                  className="bg-secondary py-2 ps-2 pe-3 rounded-pill d-flex align-items-center "
                  as={Link}
                  to={`/catalogo/page/1`}
                >
                  <Ratio
                    aspectRatio="1x1"
                    className="rounded-circle fondo-imagen me-2"
                    style={{ width: '40px' }}
                  >
                    <Image
                      src={todosLosProductos}
                      className="object-fit-cover rounded-circle"
                      fluid
                    />
                  </Ratio>
                  Todos los productos
                </Boton>
                {categorias.map((categoria) => (
                  <Boton
                    className="bg-secondary-subtle py-2 ps-2 pe-3 rounded-pill d-flex align-items-center text-dark"
                    key={categoria.id}
                    onClick={() => handleCategoryClick(categoria.id)}
                  >
                    <Ratio
                      aspectRatio="1x1"
                      className="rounded-circle fondo-imagen me-2"
                      style={{ width: '40px' }}
                    >
                      {imagenErrors[categoria.id] ? (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center"></div>
                      ) : (
                        <Image
                          src={categoria.rutaImagen}
                          className="object-fit-cover rounded-circle"
                          fluid
                          onError={() => handleImageError(categoria.id)}
                        />
                      )}
                    </Ratio>
                    {categoria.nombre}
                  </Boton>
                ))}
              </div>
            </Col>
          )}
        </Col>
        <Col lg={2} className="d-none d-lg-flex flex-column border-end py-2">
          <div className="border-bottom pb-2 mb-3">
            <Link to="/">
              <BotonSecundario className="pe-3 ps-0 py-2">
                <PiCaretLeftBold className="me-1 fs-5" />
                Volver
              </BotonSecundario>
            </Link>
          </div>
          <p className="texto-14 text-muted mb-2">Menú</p>
          {!loading ? (
            <ul className="list-unstyled">
              <li className="">
                <Link
                  className={`py-1 mb-1 d-flex  ${
                    page === null ? 'fw-semibold ' : ''
                  }`}
                  to={`/catalogo/page/1`}
                >
                  Todos los productos
                </Link>
              </li>
              {categorias.map((categoria) => (
                <li key={categoria.id} value={categoria.id}>
                  <Link
                    className={`py-1 mb-1 d-flex  ${
                      page === categoria.id ? 'fw-semibold ' : ''
                    }`}
                    to={`/catalogo/${categoria.id}/1`}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
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
        <Col xs={12} md={11} lg={9} className="py-2">
          <div className="mb-3 d-flex justify-content-between align-items-center">
            {!loading ? (
              <h1 className="mb-0 fw-bold">{title}</h1>
            ) : (
              <Placeholder xs={5} md={3} xl={2} />
            )}
            {/* <FormControl
              className="d-none d-md-inline"
              placeholder="Buscar"
              style={{ maxWidth: '300px' }}
            /> */}
          </div>
          {showGanancia && ganancia === 1 && (
            <div className="bg-secondary-subtle py-2 px-3 mb-3 rounded d-flex align-items-center">
              <p className="mb-0">
                <PiXCircleDuotone className="me-1 mb-1 text-danger" />
                <strong>ATENCIÓN:</strong> Se encuentra mostrando los precios
                mayoristas. Si desea ocultar los precios haga{' '}
                <Link className="fw-semibold" onClick={() => ocultarPrecios()}>
                  click aquí
                </Link>
                .
              </p>
            </div>
          )}
          <Row>
            {productos ? (
              productos.map((producto) => (
                <Col key={producto.id} xs={12} sm={6} md={4} className="mb-4">
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

export default Catalogo
