import { useEffect, useState } from 'react'
import { Row, Col, Image, Ratio, Spinner, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'
import { getProductosCatalogo } from '../../Functions/ProductosFunctions'

import { PiArrowRightBold } from 'react-icons/pi'

import todosLosProductos from '../../Images/all.webp'
import { Boton, CardProducto } from '../../ui'

function WelcomeLog() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [mostrarMas, setMostrarMas] = useState(false)
  const navigate = useNavigate()

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
        const shortProducts = respProductos.data.slice(0, 4)
        setProductos(shortProducts)
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      } finally {
        setLoading(false)
      }
    }

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
          <h1 className="mb-0 display-6 fw-normal">
            Hola{' '}
            <span className="fw-bold">
              {' '}
              {user.esAdmin ? user.username : user.clientes.nombre}
            </span>
          </h1>
          <h5 className="mb-0 fw-light">¡Te damos la bienvenida!</h5>
        </Col>
      </Row>
      <Row className="pb-4 justify-content-center">
        <Col xs={11} className="mb-1">
          <div className="d-flex gap-2 flex-wrap">
            <Boton
              className="bg-secondary-subtle py-2 ps-2 pe-3 rounded-pill d-flex align-items-center text-dark"
              as={Link}
              to={`/catalogo/`}
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
                to={`/catalogo/${categoria.id}`}
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

        <Col xs={11} className="mt-4">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <h2 className="fw-bold mb-0">Últimos ingresos</h2>
            <Boton
              className="fw-bold text-primary d-flex align-items-center py-0 px-1"
              variant="light"
              as={Link}
              to={'/catalogo'}
            >
              {mostrarMas ? 'Ver menos' : 'Ver más'}{' '}
              <PiArrowRightBold className="ms-2" />
            </Boton>
          </div>
          <Row>
            {loading ? (
              <Spinner className="my-5 d-block mx-auto" animation="border" />
            ) : (
              productos.map((producto) => (
                <Col key={producto.id} xs={12} sm={6} lg={3} className="mb-4">
                  <CardProducto producto={producto} />
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
