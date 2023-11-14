import { useState, useContext } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../Context/LoginContext";
import loginCliente from "../../Functions/LoginFunctions";

import catalogo from "../../Images/mockup_catalogo.png";

function Login() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const { handleLogin } = useContext(LoginContext);

  const navigate = useNavigate();

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const dataSender = async () => {
    try {
      const data = {
        username: userName,
        password: password,
      };

      if (!data.username || !data.password) {
        alert("Hay campos vacíos");
      } else {
        const response = await loginCliente(data);
        const esAdmin = response.data.esAdmin;

        if (esAdmin === 0) {
          handleLogin(userName);
          navigate("/welcome");
        } else if (esAdmin === 1) {
          handleLogin(userName);
          navigate("/admin");
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      }
    } catch (error) {
      alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      console.error("Error:", error);
    }
  };
  return (
    <Container fluid>
      <Row className="pt-5 pb-4 justify-content-center bg-white">
        <Col xs={11}>
          <h4>INGRESAR</h4>
          <Form.Group className="py-2">
            <Form.Label>Nombre de usuario:</Form.Label>
            <Form.Control type="text" onChange={userNameHandler} />
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control type="password" onChange={passwordHandler} />
          </Form.Group>
          <Button type="submit" className="mt-3" onClick={dataSender}>
            Ingresar
          </Button>
        </Col>
        <Row className="pt-3 text-center justify-content-center">
          <Col xs={8} className="border-top mt-3 pt-4">
            <Image src={catalogo} fluid />
          </Col>
          <Col xs={11}>
            <h4>¡Nuevo catálogo digital!</h4>
            <p>
              Pasá por nuestro local para suscribite a{" "}
              <strong>Marca Blanca</strong> y comenzar a utilizar nuestro{" "}
              <strong>Catálogo digital</strong>
            </p>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default Login;
