import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

import {
  getAllTallas,
  createTalla,
  updateTalla,
  deleteTalla,
} from "../../../Functions/TallasFunctions";

const TallasCRUD = () => {
  const [tallas, setTallas] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", dimensiones: "" });
  const [editData, setEditData] = useState({});

  const fetchData = async () => {
    try {
      const response = await getAllTallas();
      setTallas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      const response = await createTalla(formData);
      setCreating(false);
      setFormData({ nombre: "", dimensiones: "" });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditOpen = (talla) => {
    setCreating(false);
    setEditing(true);
    setEditData(talla);
    setFormData({ nombre: talla.nombre, dimensiones: talla.dimensiones });
  };

  const handleUpdate = async () => {
    try {
      await updateTalla(editData.id, formData);
      setEditing(false);
      setEditData({});
      setFormData({ nombre: "", dimensiones: "" });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTalla(id);
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
            setFormData({ nombre: "", dimensiones: "" });
          }}
        >
          Crear Talla
        </Button>
        <ul className="list-group mt-3">
          {tallas.map((talla) => (
            <li
              key={talla.id}
              className="list-group-item d-flex justify-content-between"
            >
              {talla.nombre} - {talla.dimensiones}
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => handleEditOpen(talla)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(talla.id)}
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
              <h6 className="text-black py-3">Crear Talla</h6>
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
                placeholder="Nombre de la talla"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Control
                type="text"
                className="form-control mt-2"
                placeholder="Dimensiones de la talla"
                value={formData.dimensiones || ""}
                onChange={(e) =>
                  setFormData({ ...formData, dimensiones: e.target.value })
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
              <h6 className="text-black py-3">Editar Talla</h6>
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
                placeholder="Nombre de la talla"
                value={formData.nombre || editData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Control
                type="text"
                className="form-control mt-2"
                placeholder="Dimensiones de la talla"
                value={formData.dimensiones || editData.dimensiones}
                onChange={(e) =>
                  setFormData({ ...formData, dimensiones: e.target.value })
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

export default TallasCRUD;
