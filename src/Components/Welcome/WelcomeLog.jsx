import { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Image,
  Ratio,
  Spinner,
  Alert,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'

import imagenCatalogo from '../../Images/mockup_catalogo.png'

function WelcomeLog() {
  const [clienteLista, setClienteLista] = useState([])
  const [loading, setLoading] = useState(false)

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
        setClienteLista(response.data)
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <Container className="py-4">
      <Row className="text-center justify-content-around pb-3 pt-4">
        <Col xs={12} md={8} lg={6}>
          <Alert variant="warning mb-4 p-4" dismissible>
            <Alert.Heading className="fs-5">
              Catálogo en <strong>fase de pruebas</strong>
            </Alert.Heading>
            <p className="mb-0">
              El catálogo se encuentra actualmente en etapa de prueba. Para
              reportar problemas, enviar comentarios u opiniones, puedes
              enviarnos un mensaje en la sección de{' '}
              <Link
                to={'/contacto'}
                className="fw-bold"
                style={{ color: 'inherit' }}
              >
                contacto.
              </Link>
            </p>
          </Alert>
        </Col>
        <Col xs={12}>
          <h1 className="mb-2" style={{ fontStretch: 'condensed' }}>
            ¡Hola <span style={{ fontWeight: 800 }}> {username}!</span>
          </h1>
          <p className="mb-1 fs-5">
            Seleccione <span className="fw-semibold">una categoría:</span>
          </p>
        </Col>
        {loading ? (
          <Spinner className="my-5 d-block mx-auto" animation="border" />
        ) : (
          ''
        )}
      </Row>
      <Row className="text-center pb-4 link-articulos justify-content-center">
        <Col
          as={Link}
          to={`/catalogo`}
          xs={6}
          md={4}
          lg={3}
          xl={2}
          className="text-center py-2"
        >
          <Ratio aspectRatio="1x1" className="rounded-circle fondo-imagen">
            <Image
              src={imagenCatalogo}
              className="object-fit-cover rounded-circle"
              fluid
            />
          </Ratio>
          <p
            className="mt-2 fs-4"
            style={{ letterSpacing: '.5px', fontStretch: 'condensed' }}
          >
            <span style={{ color: '#bbb' }}>-</span> Ver todo{' '}
            <span style={{ color: '#bbb' }}>-</span>
          </p>
        </Col>
        {clienteLista.map((producto) => (
          <Col
            key={producto.id}
            as={Link}
            to={`/catalogo/${producto.id}`}
            xs={6}
            md={4}
            lg={3}
            xl={2}
            className="text-center py-2"
          >
            <Ratio aspectRatio="1x1" className="rounded-circle fondo-imagen">
              {imagenErrors[producto.id] ? (
                // Mostrar elemento alternativo en caso de error
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                  <p className="mb-0 color-grisclaro">
                    <strong>Sin imágen</strong>
                  </p>
                </div>
              ) : (
                <Image
                  src={producto.rutaImagen}
                  className="object-fit-cover rounded-circle"
                  fluid
                  onError={() => handleImageError(producto.id)}
                />
              )}
            </Ratio>
            <p
              className="mt-2 fs-4"
              style={{ letterSpacing: '.5px', fontStretch: 'condensed' }}
            >
              <span style={{ color: '#bbb' }}>-</span> {producto.nombre}{' '}
              <span style={{ color: '#bbb' }}>-</span>
            </p>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default WelcomeLog
