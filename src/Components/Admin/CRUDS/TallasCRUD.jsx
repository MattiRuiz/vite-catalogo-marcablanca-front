import { useState, useEffect } from 'react';
import {
  getAllTallas,
  createTalla,
  updateTalla,
  deleteTalla,
} from '../../../Functions/TallasFunctions';

const TallasCRUD = () => {
  const [tallas, setTallas] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', dimensiones: '' });
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
      setTallas([...tallas, response.data]);
      setCreating(false);
      setFormData({ nombre: '', dimensiones: '' });
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
      const response = await updateTalla(editData.id, formData);
      setTallas((prevTallas) =>
        prevTallas.map((talla) =>
          talla.id === response.data.id ? response.data : talla
        )
      );
      setEditing(false);
      setEditData({});
      setFormData({ nombre: '', dimensiones: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTalla(id);
      setTallas((prevTallas) =>
        prevTallas.filter((talla) => talla.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <button
            className="btn btn-primary bg-success"
            onClick={() => {
              setCreating(true);
              setEditing(false);
              setFormData({ nombre: '', dimensiones: '' });
            }}
          >
            Crear Talla
          </button>
          <ul className="list-group mt-3">
            {tallas.map((talla) => (
              <li
                key={talla.id}
                className="list-group-item d-flex justify-content-between"
              >
                {talla.nombre} - {talla.dimensiones}
                <div>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => handleEditOpen(talla)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(talla.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {creating && (
          <div className="rounded bg-light col-md-6 mt-3">
            <div className="d-flex justify-content-between">
              <h3 className="text-black p-2">Crear Talla</h3>
              <button
                className="btn btn-light btn-sm"
                onClick={() => setCreating(false)}
              >
                X
              </button>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de la talla"
                value={formData.nombre || ''}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Dimensiones de la talla"
                value={formData.dimensiones || ''}
                onChange={(e) =>
                  setFormData({ ...formData, dimensiones: e.target.value })
                }
              />
            </div>
            <button
              className="btn btn-success mt-2 mb-2"
              onClick={handleCreate}
            >
              Guardar
            </button>
          </div>
        )}
        {editing && (
          <div className="rounded bg-light col-md-6 mt-3">
            <div className="d-flex justify-content-between">
              <h3 className="text-black p-2">Editar Talla</h3>
              <button
                className="btn btn-light btn-sm"
                onClick={() => setEditing(false)}
              >
                X
              </button>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de la talla"
                value={formData.nombre || editData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Dimensiones de la talla"
                value={formData.dimensiones || editData.dimensiones}
                onChange={(e) =>
                  setFormData({ ...formData, dimensiones: e.target.value })
                }
              />
            </div>
            <button
              className="btn btn-success mt-2 mb-2"
              onClick={handleUpdate}
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TallasCRUD;
