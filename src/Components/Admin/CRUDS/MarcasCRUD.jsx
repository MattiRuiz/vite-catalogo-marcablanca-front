import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

import {
  getAllMarcas,
  createMarca,
  updateMarca,
  deleteMarca,
} from "../../../Functions/MarcasFunctions";

const MarcasCRUD = () => {
  const [marcas, setMarcas] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre: "" });
  const [editData, setEditData] = useState({});

  const fetchData = async () => {
    try {
      const response = await getAllMarcas();
      setMarcas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      await createMarca(formData);
      setCreating(false);
      setFormData({ nombre: "" });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditOpen = (marca) => {
    setCreating(false);
    setEditing(true);
    setEditData(marca);
    setFormData({ nombre: marca.nombre });
  };

  const handleUpdate = async () => {
    try {
      await updateMarca(editData.id, formData);
      setEditing(false);
      setEditData({});
      setFormData({ nombre: "" });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMarca(id);
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
            setFormData({ nombre: "" });
          }}
        >
          Crear Marca
        </Button>
        <ul className="list-group mt-3">
          {marcas.map((marca) => (
            <li
              key={marca.id}
              className="list-group-item d-flex justify-content-between"
            >
              {marca.nombre}
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => handleEditOpen(marca)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(marca.id)}
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
              <h6 className="text-black py-3">Crear Marca</h6>
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
                placeholder="Nombre de la marca"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
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
              <h6 className="text-black py-3">Editar Marca</h6>
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
                placeholder="Nombre de la marca"
                value={formData.nombre || editData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
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

export default MarcasCRUD;
