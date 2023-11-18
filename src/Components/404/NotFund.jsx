import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const notFoundStyle = {
    color: '#F3F3F3',
    height: '81vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Container fluid style={notFoundStyle}>
      <Row className='flex-column'>
        <Col>
            <Image src='/src/Images/logo-marca.svg' className='img-fluid'></Image>
        </Col>
        <br></br>
        <Col className="text-center">
          <h1>ERROR 404 - Not Found</h1>
          <p>Oops! La página que estás buscando no existe.</p>
          <Link to="/">
            <Button variant="light">Volver a la página principal</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
