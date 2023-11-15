import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Accordion, Modal } from "react-bootstrap";

import {
  getAllClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../../../Functions/ClienteFunctions";

const ClientesCRUD = () => {
  const [showModalCreate, setModalCreate] = useState(false)
  const handleCloseCreate = () => setModalCreate(false)
  const handleShowCreate = () => setModalCreate(true)
  const [showModalEdit, setModalEdit] = useState(false)
  const handleCloseEdit = () => setModalEdit(false)
  const handleShowEdit = () => setModalEdit(true)

  const [clientes, setClientes] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
  });
  const [editData, setEditData] = useState({});

  const fetchData = async () => {
    try {
      const response = await getAllClientes();
      setClientes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      await createCliente(formData);
      setCreating(false);
      setFormData({
        username: "",
        password: "",
        nombre: "",
        apellido: "",
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditOpen = (cliente) => {
    setCreating(false);
    setEditing(true);
    setEditData(cliente);
    setFormData({
      username: cliente.username,
      password: cliente.password,
      nombre: cliente.clientes.nombre,
      apellido: cliente.clientes.apellido,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateCliente(editData.id, formData);
      fetchData();
      setEditing(false);
      setEditData({});
      setFormData({
        username: "",
        password: "",
        nombre: "",
        apellido: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCliente(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Col xs={12}>
        <Button
          variant="outline-light"
          className="mt-3"
          onClick={() => {
            setCreating(true);
            setEditing(false);
            setFormData({
              username: "",
              password: "",
              nombre: "",
              apellido: "",
            });
          }}
        >
          Crear Cliente
        </Button>
        <Button
          variant="outline-light"
          className="mt-3 ms-2"
          onClick={handleShowCreate}
        >
          Crear cliente
        </Button>
        <Modal show={showModalCreate} onHide={handleCloseCreate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crear cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group>
            <Form.Label>Nombre de usuario:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Nombre de usuario"
                value={formData.username || ""}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Contraseña"
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Apellido"
                value={formData.apellido || ""}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={handleCreate}>
              Guardar
            </Button>
          <Button variant="secondary" onClick={handleCloseCreate}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModalEdit} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <Form.Group>
              <Form.Label>Nombre de usuario:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Nombre de usuario"
                value={formData.username || editData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Contraseña"
                value={formData.password || editData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Nombre"
                value={formData.nombre || editData.clientes.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Apellido"
                value={formData.apellido || editData.clientes.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
              />
            </Form.Group> */}
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={handleUpdate}>
              Guardar
            </Button>
          <Button variant="secondary" onClick={handleCloseEdit}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
        <Row>
          <Col xs={12}>
          <Accordion className="mt-3">
          {clientes.map((cliente) => (
            <Accordion.Item eventKey={cliente.id}>
              <Accordion.Header>
                <ul className="list-unstyled my-0">
                  <li className="mb-1"><strong>User:</strong> {cliente.username}</li>
                  <li><strong>Nombre:</strong> {cliente.clientes.nombre}{" "}
              {cliente.clientes.apellido}</li>
                </ul>
                </Accordion.Header>
                <Accordion.Body>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => handleEditOpen(cliente)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(cliente.id)}
                >
                  Borrar
                </Button>
                </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
          </Col>
          <Col xs={12} lg={4}>
          {creating && (
          <Col xs={12} className="rounded bg-light mt-3 p-3">
            <Col className="d-flex justify-content-between">
              <h5 className="text-black py-3">Crear cliente</h5>
              <Button
                size="sm"
                variant="light"
                onClick={() => setCreating(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </Button>
            </Col>
            <Form.Group>
            <Form.Label>Nombre de usuario:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Nombre de usuario"
                value={formData.username || ""}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Contraseña"
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Apellido"
                value={formData.apellido || ""}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
              />
            </Form.Group>
            <Button className="my-3" onClick={handleCreate}>
              Guardar
            </Button>
          </Col>
        )}
        {editing && (
          <Col xs={12} className="rounded bg-light mt-3 p-3">
            <Col className="d-flex justify-content-between">
              <h5 className="text-black py-3">Editar Cliente</h5>
              <Button
                size="sm"
                variant="light"
                onClick={() => setEditing(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </Button>
            </Col>
            <Form.Group>
              <Form.Label>Nombre de usuario:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Nombre de usuario"
                value={formData.username || editData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Contraseña"
                value={formData.password || editData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Nombre"
                value={formData.nombre || editData.clientes.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Label>Apellido:</Form.Label>
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Apellido"
                value={formData.apellido || editData.clientes.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
              />
            </Form.Group>
            <Button className="my-3" onClick={handleUpdate}>
              Guardar Cambios
            </Button>
          </Col>
        )}
          </Col>
        </Row>
        
      </Col>
    </>
  );
};

export default ClientesCRUD;
