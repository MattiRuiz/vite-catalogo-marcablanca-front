import { useEffect, useState } from 'react'
import { Row, Col, Image, Ratio, FormControl } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'
import { getProductosCatalogo } from '../../Functions/ProductosFunctions'

import {
  PiCaretRightBold,
  PiXCircleDuotone,
  PiListDashesBold,
} from 'react-icons/pi'

import todosLosProductos from '../../Images/todos-los-productos.webp'
import banner1 from '../../Images/marcablanca-banner3.webp'
import banner2 from '../../Images/marcablanca-banner2.webp'
import { BotonSecundario, CardProducto, CardLoading } from '../../ui'

function WelcomeLog() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [showGanancia, setShowGanancia] = useState(false)
  const [ganancia, setGanancia] = useState(1.0)
  const [showCategoria, setShowCategoria] = useState(false)
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
  let user = {}
  if (userData === 'undefined') {
    alert(
      "Ocurrió un error. Por favor intente ingresar nuevamente y si el problema persiste avise a la empresa o envie un mensaje en la sección 'Contactos'."
    )
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    localStorage.removeItem('exp')
    navigate('/')
  } else {
    user = JSON.parse(userData)
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await getAllTipoProductos()
      setCategorias(response.data)
      const respProductos = await getProductosCatalogo(1)
      const shortProducts = respProductos.data.productos.slice(0, 8)
      setProductos(shortProducts)

      const localShowGanancia = JSON.parse(localStorage.getItem('showGanancia'))
      const localGanancia = JSON.parse(localStorage.getItem('ganancia') || '0')

      if (localShowGanancia && localGanancia) {
        setShowGanancia(localShowGanancia)
        let porcentual = (localGanancia + 100) / 100
        setGanancia(porcentual)
      } else if (localShowGanancia && !localGanancia) {
        setShowGanancia(localShowGanancia)
        let porcentual = (0 + 100) / 100
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
        <title>Bienvenidos | Catálogo Marca Blanca</title>
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
            <div className="overflow-hidden">
              <Col xs={12} sm={11} className="mt-3 pb-4 animacion-abajo">
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  <BotonSecundario
                    className="py-1 ps-2 pe-3 d-flex align-items-center "
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
                  </BotonSecundario>
                  {categorias.map((categoria) => (
                    <BotonSecundario
                      className="py-1 ps-2 pe-3 rounded-pill d-flex align-items-center"
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
                    </BotonSecundario>
                  ))}
                </div>
              </Col>
            </div>
          )}
        </Col>

        <Col>
          <Row className="overflow-hidden">
            <Col xs={12} md={6} className="card-container my-1">
              <Link to={'/catalogo/22/1'}>
                <Image
                  className="rounded-2"
                  src={banner1}
                  style={{ width: '100%' }}
                  fluid
                />
              </Link>
            </Col>
            <Col xs={12} md={6} className="card-container my-1">
              <Link to={'/catalogo/10/1'}>
                <Image
                  className="rounded-2"
                  src={banner2}
                  style={{ width: '100%' }}
                  fluid
                />
              </Link>
            </Col>
            <Col xs={12} className="my-2 d-none d-lg-block card-container">
              <div className="mb-2 d-flex justify-content-between align-items-center ">
                {/* <h2 className="fw-bold mb-0">Categorías</h2> */}
                {/* <FormControl placeholder="Buscar" style={{ maxWidth: '250px' }} /> */}
              </div>
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                <BotonSecundario
                  className=" py-1 ps-2 pe-3 d-flex align-items-center "
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
                </BotonSecundario>
                {categorias.map((categoria) => (
                  <BotonSecundario
                    className="py-1 ps-2 pe-3 d-flex align-items-center"
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
                  </BotonSecundario>
                ))}
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={12} className="mt-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold mb-0">Últimos ingresos</h2>
            <BotonSecundario
              className="fw-bold d-flex align-items-center py-0 px-1"
              variant="light"
              as={Link}
              to={'/catalogo/page/1'}
            >
              Ver más
              <PiCaretRightBold className="ms-2" />
            </BotonSecundario>
          </div>
          {showGanancia && ganancia === 1 && (
            <div className="bg-danger-subtle p-3 mb-3 rounded">
              <p className="mb-0 text-center">
                <PiXCircleDuotone className="me-1 mb-1 text-danger fs-5" />
                <strong>PRECIO MAYORISTA:</strong> Se encuentra mostrando los{' '}
                <strong>precios mayoristas</strong>. Si desea ocultar los
                precios haga{' '}
                <Link className="alert-link" onClick={() => ocultarPrecios()}>
                  <u>click acá</u>
                </Link>
                .
              </p>
            </div>
          )}
          <Row>
            {loading ? (
              <>
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <CardLoading />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <CardLoading />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <CardLoading />
                </Col>
                <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <CardLoading />
                </Col>
              </>
            ) : (
              productos.map((producto) => (
                <Col
                  key={producto.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
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
