import { Container, Row, Col, Ratio, Image } from 'react-bootstrap'
import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function WelcomeUnlog() {
  const [listaCategorias, setListaCategorias] = useState([])
  const baseUrl = import.meta.env.VITE_NAME

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTipoProductos()
        setListaCategorias(response.data)
      } catch (error) {
        console.error('Error al obtener los productos:', error)
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
            ¡Bienvenido al <strong>cátalogo de Marca Blanca!</strong>
          </h3>
          <h5 className="mb-1">
            {' '}
            Se requiere{' '}
            <strong>
              <Link to={'/login'}>inicio de sesion</Link>
            </strong>{' '}
            para explorar{' '}
          </h5>
        </Col>
      </Row>
      <Row className="text-center pb-5 link-articulos justify-content-around">
        {listaCategorias.map((producto) => (
          <Col
            key={producto.id}
            xs={6}
            md={4}
            lg={3}
            className="rounded text-center"
          >
            <Ratio aspectRatio="1x1">
              <Image src={baseUrl + producto.rutaImagen} fluid />
            </Ratio>
            <h6 className="mt-2 mb-4">- {producto.nombre} -</h6>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default WelcomeUnlog
