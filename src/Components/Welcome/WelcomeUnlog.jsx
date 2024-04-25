import { Container, Row, Col, Ratio, Image, Spinner } from 'react-bootstrap'
import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function WelcomeUnlog() {
  const [listaCategorias, setListaCategorias] = useState([])

  const [loading, setLoading] = useState(false)

  const [imagenErrors, setImagenErrors] = useState({})
  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await getAllTipoProductos()
        setListaCategorias(response.data)
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
        <Col xs={12} className="py-3">
          <h3 className="mb-2">
            {' '}
            ¡Bienvenido al <strong>cátalogo de Marca Blanca!</strong>
          </h3>
          <h6 className="mb-1">
            {' '}
            Se requiere{' '}
            <strong>
              <Link to={'/login'}>inicio de sesion</Link>
            </strong>{' '}
            para explorar. En él encontrarás:
          </h6>
        </Col>
        {loading ? (
          <Spinner className="my-5 d-block mx-auto" animation="border" />
        ) : (
          ''
        )}
      </Row>
      <Row className="text-center pb-4 link-articulos justify-content-center">
        {listaCategorias.map((producto) => (
          <Col
            key={producto.id}
            xs={6}
            md={4}
            lg={3}
            xl={2}
            className="text-center"
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
            <h6 className="mt-2 mb-4">- {producto.nombre} -</h6>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default WelcomeUnlog
