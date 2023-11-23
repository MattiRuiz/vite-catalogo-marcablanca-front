import { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Button, Ratio } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'

function WelcomeLog() {
  const [clienteLista, setClienteLista] = useState([])

  const [imagenError, setImagenError] = useState(false)

  const userData = localStorage.getItem('userData')
  const user = JSON.parse(userData)

  const tipoProductos = JSON.parse(localStorage.getItem('tipoProductos'))
  const username = user.username
  const baseUrl = import.meta.env.VITE_NAME

  useEffect(() => {
    const fetchData = async () => {
      if (!tipoProductos) {
        try {
          const response = await getAllTipoProductos()
          setClienteLista(response.data)
        } catch (error) {
          console.error('Error al obtener los productos:', error)
        }
      } else {
        setClienteLista(tipoProductos)
        console.log(tipoProductos)
      }
    }
    fetchData()
  }, [])

  return (
    <Container fluid className="bg-white">
      <Row className="text-center justify-content-around pb-3 pt-4">
        <Col xs={12}>
          <h3 className="mb-1">
            {' '}
            ¡Bienvenido <strong> {username}!</strong>{' '}
          </h3>
          <Button as={Link} to={'/catalogo'} className="mt-2 mb-4">
            Click aquí para ver el catálogo
          </Button>
          <p>O seleccione una categoría para comenzar:</p>
        </Col>
      </Row>
      <Row className="text-center pb-5 link-articulos justify-content-around">
        {clienteLista.map((producto) => (
          <Col
            key={producto.id}
            as={Link}
            to={`/catalogo/${producto.id}`}
            xs={6}
            md={4}
            lg={3}
            xl={2}
            className="text-center"
          >
            <Ratio aspectRatio="1x1" className="rounded-circle fondo-imagen">
              {imagenError ? (
                // Mostrar elemento alternativo en caso de error
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                  <p className="mb-0 color-grisclaro">
                    <strong>Sin imágen</strong>
                  </p>
                </div>
              ) : (
                <Image
                  src={baseUrl + producto.rutaImagen}
                  fluid
                  onError={() => setImagenError(true)}
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

export default WelcomeLog
