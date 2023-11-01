import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProductos } from '../../Functions/ProductosFunctions';
import { getProductosPorCategoria } from '../../Functions/ProductosFunctions';
import {
  Container,
  Row,
  Col,
  Ratio,
  Card,
  Badge,
} from 'react-bootstrap';

function Catalog() {
  const { id } = useParams();
  const baseUrl = import.meta.env.REACT_APP_BASE_URL;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        if (id) {
          const response = await getProductosPorCategoria(id);
          setProducts(response.data);
        }else{
          const response = await getAllProductos();
          setProducts(response.data);
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    fetchData();
  }, []);

  return (
    <Container fluid className="bg-white">
    <Row className="justify-content-around pb-3 pt-4">
      {products.map((product) => (
      <Col key={product.id} xs={12} className="mb-2">
        <Card className="mb-3">
          <Ratio aspectRatio="4x3">
            <Card.Img variant="top" src={baseUrl + product.rutaImagen} />
          </Ratio>
          <Card.ImgOverlay>
            <Badge className="fs-6">
              {id + '0' +product.id}
            </Badge>
          </Card.ImgOverlay>
          <Card.Body className="pb-1">
            <Card.Title>
              {product.nombre}
            </Card.Title>
            <Card.Text>
              <ul className="list-unstyled">
                {product.productos_tallas
                  ? product.productos_tallas.map((talla, index) => (
                      <li key={index}>
                        <em>{talla.talla}: {talla.dimensiones} ====== ${talla.precio}</em>
                      </li>
                    ))
                  : null}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
  </Container>
);
}

export default Catalog;
