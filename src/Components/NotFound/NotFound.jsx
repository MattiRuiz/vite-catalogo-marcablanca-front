import { Row, Col, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logoMB from '../../Images/logo-marca.svg'

const NotFound = () => {
  return (
    <Row
      className="flex-column align-items-center justify-content-center bg-primario"
      style={{ minHeight: '80vh' }}
    >
      <Col xs={8} md={6} lg={4}>
        <Image src={logoMB} fluid />
      </Col>
      <br></br>
      <Col xs={12} className="text-center text-white">
        <h1>ERROR 404 - Not Found</h1>
        <p>Oops! La página que estás buscando no existe.</p>
        <Link to="/">
          <Button className="mb-4" variant="light">
            Volver a la página principal
          </Button>
        </Link>
      </Col>
    </Row>
  )
}

export default NotFound
