import { useState, useEffect } from 'react';
import {
  getAllMarcas,
  createMarca,
  updateMarca,
  deleteMarca,
} from '../../../Functions/MarcasFunctions';

const MarcasCRUD = () => {
  const [marcas, setMarcas] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre: '' });
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
      const response = await createMarca(formData);
      setMarcas([...marcas, response.data]);
      setCreating(false);
      setFormData({ nombre: '' });
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
      const response = await updateMarca(editData.id, formData);
      setMarcas((prevMarcas) =>
        prevMarcas.map((marca) =>
          marca.id === response.data.id ? response.data : marca
        )
      );
      setEditing(false);
      setEditData({});
      setFormData({ nombre: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMarca(id);
      setMarcas((prevMarcas) =>
        prevMarcas.filter((marca) => marca.id !== id)
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
              setFormData({ nombre: '' });
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
        </div>
        {creating && (
          <div className="rounded bg-light col-md-6 mt-3">
            <div className="d-flex justify-content-between">
              <h3 className="text-black p-2">Crear Marca</h3>
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
                placeholder="Nombre de la marca"
                value={formData.nombre || ''}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
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
              <h3 className="text-black p-2">Editar Marca</h3>
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
                placeholder="Nombre de la marca"
                value={formData.nombre || editData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
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

export default MarcasCRUD;
