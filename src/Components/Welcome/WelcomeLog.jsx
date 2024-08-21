import { useEffect, useState } from 'react'
import { Row, Col, Image, Ratio, Spinner, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'
import { getProductosCatalogo } from '../../Functions/ProductosFunctions'

import todosLosProductos from '../../Images/all.webp'

import { PiArrowRightBold } from 'react-icons/pi'

function WelcomeLog() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [mostrarMas, setMostrarMas] = useState(false)

  const [imagenErrors, setImagenErrors] = useState({})
  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  const userData = localStorage.getItem('userData')
  const user = JSON.parse(userData)

  const username = user.username

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await getAllTipoProductos()
        setCategorias(response.data)
        const respProductos = await getProductosCatalogo(1)
        console.log(respProductos.data)
        setProductos(respProductos.data)
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Limitar la cantidad de categorías a mostrar
  const categoriasAMostrar = mostrarMas ? categorias : categorias.slice(0, 5)

  const showGanancia = localStorage.getItem('showGanancia')
  let ganancia = 1
  let porcentual = 1.0

  if (showGanancia == 'true') {
    const gananciaStr = localStorage.getItem('ganancia')
    ganancia = JSON.parse(gananciaStr)
    porcentual = (ganancia + 100) / 100
  }

  return (
    <>
      <Row className="justify-content-around pt-4 pb-3">
        <Col xs={11} className="border-bottom pb-3">
          <h1 className="mb-0 display-4 fw-normal">
            Hola <span className="fw-bold"> {username}</span>
          </h1>
          <h5 className="mb-0">¡Te damos la bienvenida nuevamente!</h5>
        </Col>
      </Row>
      <Row className="pb-4 justify-content-center">
        <Col xs={11}>
          <div className="d-flex justify-content-between align-items-end mb-3">
            <h2 className="fw-bold mb-0">Categorías</h2>
            <Button
              className="fw-bold text-primary d-flex align-items-center py-0 px-1"
              onClick={() => setMostrarMas(!mostrarMas)}
              variant="light"
            >
              {mostrarMas ? 'Ver menos' : 'Ver más'}{' '}
              <PiArrowRightBold className="ms-2" />
            </Button>
          </div>
          <Row>
            {loading ? (
              <Spinner className="my-5 d-block mx-auto" animation="border" />
            ) : (
              <>
                <Col
                  as={Link}
                  to={`/catalogo`}
                  xs={6}
                  md={4}
                  lg={3}
                  xl={2}
                  className="py-2"
                >
                  <div className="position-relative">
                    {/* Superposición de fondo oscuro */}
                    <div className="overlay position-absolute top-0 start-0 w-100 h-100 rounded-3"></div>
                    {/* Texto sobre la imagen */}

                    <p
                      className="fs-5 position-absolute bottom-0 start-0 ms-4 z-3 fw-semibold text-white"
                      style={{ letterSpacing: '.5px', lineHeight: 1.1 }}
                    >
                      Catalogo
                      <br />
                      <span className="fw-normal fs-6">Ver productos</span>
                    </p>
                    <Ratio aspectRatio="1x1" className="rounded-3 fondo-imagen">
                      <Image
                        src={todosLosProductos}
                        className="object-fit-cover rounded-3"
                        fluid
                      />
                    </Ratio>
                  </div>
                </Col>

                {categoriasAMostrar.map((producto) => (
                  <Col
                    key={producto.id}
                    as={Link}
                    to={`/catalogo/${producto.id}`}
                    xs={6}
                    md={4}
                    lg={3}
                    xl={2}
                    className="py-2"
                  >
                    <div className="position-relative">
                      {/* Superposición de fondo oscuro */}
                      <div className="overlay position-absolute top-0 start-0 w-100 h-100 rounded-3"></div>
                      {/* Texto sobre la imagen */}
                      <p
                        className="fs-5 position-absolute bottom-0 start-0 ms-4 z-3 fw-semibold text-white"
                        style={{ letterSpacing: '.5px' }}
                      >
                        {producto.nombre}
                      </p>
                      <Ratio
                        aspectRatio="1x1"
                        className="rounded-3 fondo-imagen"
                      >
                        {imagenErrors[producto.id] ? (
                          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                            <p className="mb-0 color-grisclaro">
                              <strong>Sin imágen</strong>
                            </p>
                          </div>
                        ) : (
                          <Image
                            src={producto.rutaImagen}
                            className="object-fit-cover rounded-3"
                            fluid
                            onError={() => handleImageError(producto.id)}
                          />
                        )}
                      </Ratio>
                    </div>
                  </Col>
                ))}
              </>
            )}
          </Row>
        </Col>

        <Col xs={11} className="mt-4">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <h2 className="fw-bold mb-0">Últimos productos</h2>
            <Button
              className="fw-bold text-primary d-flex align-items-center py-0 px-1"
              variant="light"
              as={Link}
              to={'/catalogo'}
            >
              {mostrarMas ? 'Ver menos' : 'Ver más'}{' '}
              <PiArrowRightBold className="ms-2" />
            </Button>
          </div>
          <Row>
            {loading ? (
              <Spinner className="my-5 d-block mx-auto" animation="border" />
            ) : (
              productos.map((producto) => (
                <Col key={producto.id} xs={12} sm={6} lg={3} className="mb-4">
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
                      {producto.marca === 'Otros' ? (
                        ''
                      ) : (
                        <p
                          className="mb-0 bg-primary bg-gradient text-white fw-semibold position-absolute top-0 start-0 z-3 mt-2 ms-2 px-2 py-0 rounded-2 shadow-sm"
                          style={{ letterSpacing: '.25px' }}
                        >
                          {producto.marca}
                        </p>
                      )}
                      <Card.Body className="pb-0 px-2 pt-2">
                        <Card.Title className="fw-semibold mb-2">
                          {producto.nombre}
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2 fst-italic">
                          {producto.descripcion}
                        </Card.Subtitle>
                        {producto.tallas
                          .filter((talla) => talla.stock == 1)
                          .map((talla, index) => (
                            <div key={index}>
                              <div className="d-flex justify-content-between gap-2 mb-1">
                                <div className="d-flex justify-content-center flex-column">
                                  {talla.talla_nombre && (
                                    <p className="fw-bold text-uppercase mb-0">
                                      {talla.talla_nombre}
                                    </p>
                                  )}
                                  <p className="mb-0"> {talla.dimensiones}</p>
                                </div>
                                <div>
                                  {showGanancia == 'true' ? (
                                    <div className="">
                                      <p className="fw-bold mb-0">
                                        $
                                        {Math.trunc(
                                          parseInt(talla.precio) * porcentual
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
            )}
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default WelcomeLog
