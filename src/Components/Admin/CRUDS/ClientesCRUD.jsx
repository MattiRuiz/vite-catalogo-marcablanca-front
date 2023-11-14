import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

import {
  getAllClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../../../Functions/ClienteFunctions";

const ClientesCRUD = () => {
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
        <ul className="list-group mt-3">
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
              className="list-group-item d-flex justify-content-between"
            >
              {cliente.username} <br /> {cliente.clientes.nombre}{" "}
              {cliente.clientes.apellido}
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => handleEditOpen(cliente)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(cliente.id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        {creating && (
          <Col xs={12} className="rounded bg-light mt-3 p-3">
            <Col className="d-flex justify-content-between">
              <h6 className="text-black py-3">Crear cliente</h6>
              <Button
                size="sm"
                variant="light"
                onClick={() => setCreating(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </Button>
            </Col>
            <Form.Group>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
                value={formData.username || ""}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <Form.Control
                type="text"
                className="form-control mt-2"
                placeholder="Contraseña"
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Form.Control
                type="text"
                className="form-control mt-2"
                placeholder="Nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Control
                type="text"
                className="form-control mt-2"
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
              <h6 className="text-black py-3">Editar Cliente</h6>
              <Button
                size="sm"
                variant="light"
                onClick={() => setEditing(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </Button>
            </Col>
            <Form.Group>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
                value={formData.username || editData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <Form.Control
                type="text"
                className="form-control mt-2"
                placeholder="Contraseña"
                value={formData.password || editData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Form.Control
                type="text"
                className="form-control mt-2"
                placeholder="Nombre"
                value={formData.nombre || editData.clientes.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Control
                type="text"
                className="form-control mt-2"
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
      </Row>
    </>
  );
};

export default ClientesCRUD;
