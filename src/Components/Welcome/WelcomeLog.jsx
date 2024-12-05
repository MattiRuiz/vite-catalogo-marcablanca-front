import { useEffect, useState } from 'react'
import { Row, Col, Image, Ratio, Spinner, FormControl } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'
import { getProductosCatalogo } from '../../Functions/ProductosFunctions'

import {
  PiArrowRightBold,
  PiXCircleDuotone,
  PiListDashesBold,
} from 'react-icons/pi'

import todosLosProductos from '../../Images/all.webp'
import { Boton, CardProducto, BotonSecundario } from '../../ui'

function WelcomeLog() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [showGanancia, setShowGanancia] = useState(false)
  const [ganancia, setGanancia] = useState(1.0)
  const [showCategoria, setShowCategoria] = useState(true)
  const navigate = useNavigate()

  const [imagenErrors, setImagenErrors] = useState({})
  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  const ocultarPrecios = () => {
    setShowGanancia(false)
    localStorage.setItem('showGanancia', false)
  }

  const userData = localStorage.getItem('userData')
  const user = JSON.parse(userData)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await getAllTipoProductos()
      setCategorias(response.data)
      const respProductos = await getProductosCatalogo(1)
      const shortProducts = respProductos.data.productos.slice(0, 8)
      setProductos(shortProducts)

      const localGanancia = JSON.parse(localStorage.getItem('showGanancia'))
      if (localGanancia) {
        setShowGanancia(localGanancia)
        let valorGanancia = JSON.parse(localStorage.getItem('ganancia'))
        let porcentual = (valorGanancia + 100) / 100
        setGanancia(porcentual)
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.esAdmin) {
      fetchData()
    } else {
      if (user.clientes.subscriptions.estado === 'active') {
        fetchData()
      } else {
        navigate('/mi-cuenta')
      }
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Inicio | Catálogo Marca Blanca</title>
      </Helmet>
      <Row className="pt-2 pt-lg-4 pb-4 justify-content-center">
        <Col xs={12} className="d-lg-none">
          <div className="d-flex justify-content-between border-bottom pb-2">
            {/* <FormControl placeholder="Buscar" style={{ maxWidth: '250px' }} /> */}
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
                    as={Link}
                    to={`/catalogo/${categoria.id}/1`}
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
        <Col xs={12} className="mb-1 d-none d-lg-block">
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <h1 className="fw-bold mb-0">Categorías</h1>
            {/* <FormControl placeholder="Buscar" style={{ maxWidth: '250px' }} /> */}
          </div>
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
                as={Link}
                to={`/catalogo/${categoria.id}/1`}
                key={categoria.id}
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

        <Col xs={12} className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="fw-bold mb-0">Últimos ingresos</h1>
            <Boton
              className="fw-bold d-flex align-items-center py-0 px-1"
              variant="light"
              as={Link}
              to={'/catalogo'}
            >
              Ver más
              <PiArrowRightBold className="ms-2" />
            </Boton>
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
            {loading ? (
              <Spinner className="my-5 d-block mx-auto" animation="border" />
            ) : (
              productos.map((producto) => (
                <Col key={producto.id} xs={6} md={4} lg={3} className="mb-4">
                  <CardProducto
                    producto={producto}
                    showGanancia={showGanancia}
                    ganancia={ganancia}
                  />
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default WelcomeLog
