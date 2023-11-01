import { useState, useEffect } from 'react';
import {
  getAllClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../../../Functions/ClienteFunctions';

const ClientesCRUD = () => {
  const [clientes, setClientes] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nombre: '',
    apellido: '',
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
      const response = await createCliente(formData);
      setCreating(false);
      setFormData({
        username: '',
        password: '',
        nombre: '',
        apellido: '',
      });
      fetchData()
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
      const response = await updateCliente(editData.id, formData);
      fetchData()
      setEditing(false);
      setEditData({});
      setFormData({
        username: '',
        password: '',
        nombre: '',
        apellido: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCliente(id);
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
            className="btn btn-primary bg-success"
            onClick={() => {
              setCreating(true);
              setEditing(false);
              setFormData({
                username: '',
                password: '',
                nombre: '',
                apellido: '',
              });
            }}
          >
            Crear Cliente
          </button>
          <ul className="list-group mt-3">
            {clientes.map((cliente) => (
              <li
                key={cliente.id}
                className="list-group-item d-flex justify-content-between"
              >
                {cliente.username} <br/> {cliente.clientes.nombre} {cliente.clientes.apellido}
                <div>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => handleEditOpen(cliente)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(cliente.id)}
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
              <h3 className="text-black p-2">Crear Cliente</h3>
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
                placeholder="Nombre de usuario"
                value={formData.username || ''}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Contraseña"
                value={formData.password || ''}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Nombre"
                value={formData.nombre || ''}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Apellido"
                value={formData.apellido || ''}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
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
              <h3 className="text-black p-2">Editar Cliente</h3>
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
                placeholder="Nombre de usuario"
                value={formData.username || editData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Contraseña"
                value={formData.password || editData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Nombre"
                value={formData.nombre || editData.clientes.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Apellido"
                value={formData.apellido || editData.clientes.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
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

export default ClientesCRUD;
