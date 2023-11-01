import { useState, useEffect } from 'react';
import {
  getAllTipoProductos,
  createTipoProducto,
  updateTipoProducto,
  deleteTipoProducto,
} from '../../../Functions/TipoProductosFunctions';

const TipoProductoCRUD = () => {
  const [tipoProductos, setTipoProductos] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', imagen: null });
  const [editData, setEditData] = useState({});

  const fetchData = async () => {
    try {
      const response = await getAllTipoProductos();
      setTipoProductos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      const formDataForAPI = new FormData();
      formDataForAPI.append('nombre', formData.nombre);
      formDataForAPI.append('imagen', formData.imagen);

      const response = await createTipoProducto(formDataForAPI);
      setCreating(false);
      setFormData({ nombre: '', imagen: null });
      fetchData()
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditOpen = (tipoProducto) => {
    setCreating(false);
    setEditing(true);
    setEditData(tipoProducto);
    setFormData({ nombre: tipoProducto.nombre, imagen: tipoProducto.imagen });
  };

  const handleUpdate = async () => {
    try {
      const formDataForAPI = new FormData();
      formDataForAPI.append('nombre', formData.nombre);
      formDataForAPI.append('imagen', formData.imagen);

      const response = await updateTipoProducto(editData.id, formDataForAPI);
      setEditing(false);
      setEditData({});
      setFormData({ nombre: '', imagen: null });
      fetchData()
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTipoProducto(id);
      fetchData()

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <button
            className="bg-success btn btn-primary"
            onClick={() => {
              setCreating(true);
              setEditing(false);
              setFormData({ nombre: '', imagen: null });
            }}
          >
            Crear Tipo de Producto
          </button>
          <ul className="list-group mt-3">
            {tipoProductos.map((tipoProducto) => (
              <li
                key={tipoProducto.id}
                className="list-group-item d-flex justify-content-between"
              >
                {tipoProducto.nombre}
                <div>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => handleEditOpen(tipoProducto)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(tipoProducto.id)}
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
              <h3 className="text-black p-2">Crear Tipo de Producto</h3>
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
                placeholder="Nombre del tipo de producto"
                value={formData.nombre || ''}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <input
                type="file"
                className="form-control mt-2"
                onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })}
              />
            </div>
            <button
              className="btn btn-info mb-2 mt-2 center"
              onClick={handleCreate}
            >
              Guardar
            </button>
          </div>
        )}
        {editing && (
          <div className="rounded bg-light  col-md-6 mt-3">
            <div className="d-flex justify-content-between">
              <h3 className="text-black p-2">Editar Tipo de Producto</h3>
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
                placeholder="Nombre del tipo de producto"
                value={formData.nombre || editData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <input
                type="file"
                className="form-control mt-2"
                onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })}
              />
            </div>
            <button
              className="btn btn-info mb-2 mt-2 center"
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

export default TipoProductoCRUD;
