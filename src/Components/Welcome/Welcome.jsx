import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginProvider from "../../Context/LoginContext";
import { getAllTipoProductos } from "../../Functions/TipoProductosFunctions";

function Welcome() {
  const { auth } = useContext(LoginProvider);
  const [clienteLista, setClienteLista] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTipoProductos();
        setClienteLista(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid className="bg-white">
      <Row className="text-center justify-content-around pb-3 pt-4">
        <Col xs={12}>
          <h3 className="mb-1">
            ¡Bienvenido{" "}
            {auth ? <strong>{auth}!</strong> : <strong>Usuario!</strong>}
          </h3>
          <Button as={Link} to={"/catalogo"} className="mt-2 mb-4">
            Click aquí para ver el catálogo
          </Button>
          <p>O seleccione una categoría para comenzar:</p>
        </Col>
      </Row>
      <Row className="text-center justify-content-around pb-5 link-articulos">
        {clienteLista.map((producto) => (
          <Col
            key={producto.id}
            as={Link}
            to={`/catalogo/${producto.id}`}
            xs={6}
            className="rounded text-center"
          >
            <Col xs={10} className="mx-auto">
              <Image
                src={"http://localhost:5678"+ producto.rutaImagen}
                fluid
              />
            </Col>
            <p className="fs-6">{producto.nombre}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Welcome;
