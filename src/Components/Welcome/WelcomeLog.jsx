import {  useEffect, useState } from 'react'
import { Container, Row, Col, Image, Button, Ratio } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllTipoProductos } from '../../Functions/TipoProductosFunctions'

function WelcomeLog() {
  const username = localStorage.getItem('username')
  const [clienteLista, setClienteLista] = useState([])
  const baseUrl = import.meta.env.VITE_NAME

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTipoProductos()
        setClienteLista(response.data)
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
          <h3 className="mb-1"> ¡Bienvenido <strong>  {username}!</strong> </h3>
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

export default WelcomeLog
