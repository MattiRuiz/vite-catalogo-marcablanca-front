import { useContext, useState } from "react";
import { Offcanvas, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import LoginContext from "../../Context/LoginContext";

function MenuLoged({ close }) {
  const { handleLogin } = useContext(LoginContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const logout = () => {
    handleLogin();
    navigate("/");
  };
  return (
    <>
      <Offcanvas.Body>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to={"/"} onClick={close}>
              Inicio
            </Link>
          </li>
          <li className="mb-3">
            <Link to={"/welcome"} onClick={close}>
              Catálogo
            </Link>
          </li>
          <li className="mb-3">
            <Link to={"/lista-precios"} onClick={close}>
              Lista de precios
            </Link>
          </li>
          <li className="mb-3">
            <Link onClick={handleShow}>
              <strong>Cerrar sesión</strong>
            </Link>
          </li>
        </ul>
      </Offcanvas.Body>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Atención!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Deseas cerrar sesión?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={logout}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default MenuLoged;
