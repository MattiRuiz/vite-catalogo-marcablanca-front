import { useState, useEffect } from 'react';
import {
  getAllProductosSinTallas,
  createProducto,
  updateProducto,
  deleteProducto,
} from '../../../Functions/ProductosFunctions';
import {
  getAllTipoProductos,
} from '../../../Functions/TipoProductosFunctions';
import {
  getAllMarcas,
} from '../../../Functions/MarcasFunctions';

const ProductosCRUD = () => {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', imagen: null, marcasId: '', tipoProductoId: '', adminsId: 3 });
  const [editData, setEditData] = useState({});

  const fetchData = async () => {
    try {
      const responseProductos = await getAllProductosSinTallas();
      setProductos(responseProductos.data);

      const responseMarcas = await getAllMarcas();
      setMarcas(responseMarcas.data);

      const responseCategorias = await getAllTipoProductos();
      setCategorias(responseCategorias.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditOpen = (producto) => {
    setCreating(false);
    setEditing(true);
    setEditData(producto);
    setFormData({
      nombre: producto.nombre,
      imagen: producto.rutaImagen,
      marcasId: producto.marcas.id,
      tipoProductoId: producto.tipo_producto.id,
      adminsId: 3,
    });
  };

  const handleCreate = async () => {
    try {
      const formDataForAPI = new FormData();
      formDataForAPI.append('nombre', formData.nombre);
      formDataForAPI.append('imagen', formData.imagen);
      formDataForAPI.append('marcas_id', formData.marcasId);
      formDataForAPI.append('tipo_producto_id', formData.tipoProductoId);
      formDataForAPI.append('admins_id', formData.adminsId);
  
      await createProducto(formDataForAPI);
      setCreating(false);
      setFormData({ nombre: '', imagen: null, marcasId: '', tipoProductoId: '', adminsId: 3 });
      fetchData(); // Actualizar datos después de crear
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleUpdate = async () => {
    try {
      const formDataForAPI = new FormData();
      formDataForAPI.append('nombre', formData.nombre);
      formDataForAPI.append('imagen', formData.imagen);
      formDataForAPI.append('marcas_id', formData.marcasId);
      formDataForAPI.append('tipo_producto_id', formData.tipoProductoId);
      formDataForAPI.append('admins_id', formData.adminsId);
  
      await updateProducto(editData.id, formDataForAPI);
      setEditing(false);
      setEditData({});
      setFormData({ nombre: '', imagen: null, marcasId: '', tipoProductoId: '', adminsId: 3 });
      fetchData(); // Actualizar datos después de actualizar
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await deleteProducto(id);
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
              setFormData({ nombre: '', imagen: null, marcasId: '', tipoProductoId: '', adminsId: 5 });
            }}
          >
            Crear Producto
          </button>
          <ul className="list-group mt-3">
            {productos.map((producto) => (
              <li key={producto.id} className="list-group-item d-flex justify-content-between ">
                {producto.nombre}
                <br />
                {producto.marcas.nombre}
                <br />
                Categoria: {producto.tipo_producto.nombre}
                <div className='d-flex align-items-center'>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => handleEditOpen(producto)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(producto.id)}
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
              <h3 className="text-black p-2">Crear Producto</h3>
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
                placeholder="Nombre del producto"
                value={formData.nombre || ''}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <input
                type="file"
                className="form-control mt-2"
                onChange={(e) =>
                  setFormData({ ...formData, imagen: e.target.files[0] })
                }
              />
              <select
                className="form-control mt-2"
                value={formData.marcasId}
                onChange={(e) =>
                  setFormData({ ...formData, marcasId: e.target.value })
                }
              >
                <option value="">Selecciona una marca</option>
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
              <select
                className="form-control mt-2"
                value={formData.tipoProductoId}
                onChange={(e) =>
                  setFormData({ ...formData, tipoProductoId: e.target.value })
                }
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
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
              <h3 className="text-black p-2">Editar Producto</h3>
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
                placeholder="Nombre del producto"
                value={formData.nombre || editData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <input
                type="file"
                className="form-control mt-2"
                onChange={(e) =>
                  setFormData({ ...formData, imagen: e.target.files[0] })
                }
              />
              <select
                className="form-control mt-2"
                value={formData.marcasId}
                onChange={(e) =>
                  setFormData({ ...formData, marcasId: e.target.value })
                }
              >
                <option value="">Selecciona una marca</option>
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
              <select
                className="form-control mt-2"
                value={formData.tipoProductoId}
                onChange={(e) =>
                  setFormData({ ...formData, tipoProductoId: e.target.value })
                }
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
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

export default ProductosCRUD;
