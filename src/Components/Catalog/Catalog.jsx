import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Ratio, Card, Badge, Button, Alert, Form } from 'react-bootstrap';
import { getAllProductos } from '../../Functions/ProductosFunctions';
import CardLoading from './CardLoading';

function Catalog() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_NAME;

  //#region GANANCIAS/PRECIOS
  const showGanancia = localStorage.getItem('showGanancia');
  let ganancia = 1;
  let porcentual = 1.0;

  if (showGanancia == true) {
    const gananciaStr = localStorage.getItem('ganancia');
    ganancia = JSON.parse(gananciaStr);
    porcentual = (ganancia + 100) / 100;
  }
  //#endregion

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAllProductos(); // Ajusta según tu API
        setCategorias(response.data);
        if (!response.data.length) handleShow();
      } catch (e) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleShow = () => setShowAlert(true);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value === 'all' ? null : e.target.value);
  };

  return (
    <Container fluid className="bg-white py-4">
      <Button variant="Light" as={Link} to={'/welcome'} className="py-3 ps-0">
        <span className="material-symbols-outlined">arrow_back</span>
      </Button>

      <Form.Select onChange={handleCategoryChange} className="mb-3" defaultValue="all">
        <option value="all">Todas las categorías</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </Form.Select>

      {loading ? (
        <Row className="justify-content-start my-3 g-3">
          <CardLoading />
          <CardLoading />
        </Row>
      ) : null}

      <Row className="justify-content-start my-3 g-3">
        {categorias
          .filter((categoria) => (!selectedCategory || categoria.id == selectedCategory) && categoria.productos.length > 2)
          .map((categoria) => (
            <Col key={categoria.id} xs={12} className="mb-2">
              <h2>{categoria.nombre}</h2>
              <Row>
                {categoria.productos
                  .filter((producto) => producto.productos_tallas.length > 0)
                  .map((producto) => (
                    <Col key={producto.id} xs={12} md={6} lg={4} xl={3} className="mb-2">
                      <Card className="mb-3 h-100">
                        <Ratio aspectRatio="4x3" className="fondo-imagen">
                          <Card.Img alt={producto.nombre} variant="top" src={baseUrl + producto.rutaImagen} />
                        </Ratio>
                        <Card.ImgOverlay>
                          <Badge className="fs-6">{categoria.id + producto.id}</Badge>
                        </Card.ImgOverlay>
                        <Card.Body className="pb-0">
                          <Card.Title>{producto.nombre}</Card.Title>
                          <Card.Subtitle className="text-muted pb-3">{producto.descripcion}</Card.Subtitle>
                          <Card.Text>
                            {
                              showGanancia == 'true' ? 
                              <ul className="list-unstyled">
                              {producto.productos_tallas.map((talla, index) => (
                                <li key={index}>
                                  <strong>{talla.tallas.nombre} - </strong> {talla.tallas.dimensiones}: ${parseInt(talla.precio) * porcentual}
                                </li>
                              ))}
                            </ul>
                            :
                            <></>
                            }
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Catalog;
