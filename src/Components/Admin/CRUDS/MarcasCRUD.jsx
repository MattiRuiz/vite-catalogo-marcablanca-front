import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";

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
        <button
          className="btn btn-primary bg-success"
          onClick={() => {
            setCreating(true);
            setEditing(false);
            setFormData({ nombre: "" });
          }}
        >
          Crear Marca
        </button>
        <ul className="list-group mt-3">
          {marcas.map((marca) => (
            <li
              key={marca.id}
              className="list-group-item d-flex justify-content-between"
            >
              {marca.nombre}
              <div>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEditOpen(marca)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(marca.id)}
                >
                  Eliminar
                </button>
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
              <button
                className="btn btn-light btn-sm"
                onClick={() => setCreating(false)}
              >
                X
              </button>
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
            <button
              className="btn btn-success mt-2 mb-2"
              onClick={handleCreate}
            >
              Guardar
            </button>
          </Col>
        )}
        {editing && (
          <Col xs={12} className="rounded bg-light mt-3 p-3">
            <Col className="d-flex justify-content-between">
              <h6 className="text-black py-3">Editar Marca</h6>
              <button
                className="btn btn-light btn-sm"
                onClick={() => setEditing(false)}
              >
                X
              </button>
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
            <button
              className="btn btn-success mt-2 mb-2"
              onClick={handleUpdate}
            >
              Guardar Cambios
            </button>
          </Col>
        )}
      </Row>
    </>
  );
};

export default MarcasCRUD;
