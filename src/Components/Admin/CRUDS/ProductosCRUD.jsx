import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

import {
  getAllProductosSinTallas,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../../../Functions/ProductosFunctions";
import { getAllTipoProductos } from "../../../Functions/TipoProductosFunctions";
import { getAllMarcas } from "../../../Functions/MarcasFunctions";

const ProductosCRUD = () => {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    imagen: null,
    marcasId: "",
    tipoProductoId: "",
    adminsId: 2,
  });
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
      adminsId: 2,
    });
  };

  const handleCreate = async () => {
    try {
      const formDataForAPI = new FormData();
      formDataForAPI.append("nombre", formData.nombre);
      formDataForAPI.append("imagen", formData.imagen);
      formDataForAPI.append("marcas_id", formData.marcasId);
      formDataForAPI.append("tipo_producto_id", formData.tipoProductoId);
      formDataForAPI.append("admins_id", formData.adminsId);

      await createProducto(formDataForAPI);
      setCreating(false);
      setFormData({
        nombre: "",
        imagen: null,
        marcasId: "",
        tipoProductoId: "",
        adminsId: 2,
      });
      fetchData(); // Actualizar datos después de crear
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formDataForAPI = new FormData();
      formDataForAPI.append("nombre", formData.nombre);
      formDataForAPI.append("imagen", formData.imagen);
      formDataForAPI.append("marcas_id", formData.marcasId);
      formDataForAPI.append("tipo_producto_id", formData.tipoProductoId);
      formDataForAPI.append("admins_id", formData.adminsId);

      await updateProducto(editData.id, formDataForAPI);
      setEditing(false);
      setEditData({});
      setFormData({
        nombre: "",
        imagen: null,
        marcasId: "",
        tipoProductoId: "",
        adminsId: 2,
      });
      fetchData(); // Actualizar datos después de actualizar
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProducto(id);
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
              nombre: "",
              imagen: null,
              marcasId: "",
              tipoProductoId: "",
              adminsId: 5,
            });
          }}
        >
          Crear Producto
        </Button>
        <ul className="list-group mt-3">
          {productos.map((producto) => (
            <li
              key={producto.id}
              className="list-group-item d-flex justify-content-between "
            >
              {producto.nombre}
              <br />
              {producto.marcas.nombre}
              <br />
              Categoria: {producto.tipo_producto.nombre}
              <div className="d-flex align-items-center">
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => handleEditOpen(producto)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(producto.id)}
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
              <h6 className="text-black py-3">Crear Producto</h6>
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
                placeholder="Nombre del producto"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Control
                type="file"
                className="form-control mt-2"
                onChange={(e) =>
                  setFormData({ ...formData, imagen: e.target.files[0] })
                }
              />
              <Form.Select
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
              </Form.Select>
              <Form.Select
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
              </Form.Select>
            </Form.Group>
            <Button className="my-3" onClick={handleCreate}>
              Guardar
            </Button>
          </Col>
        )}
        {editing && (
          <Col xs={12} className="rounded bg-light mt-3 p-3">
            <Col className="d-flex justify-content-between">
              <h6 className="text-black py-3">Editar Producto</h6>
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
                placeholder="Nombre del producto"
                value={formData.nombre || editData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Control
                type="file"
                className="form-control mt-2"
                onChange={(e) =>
                  setFormData({ ...formData, imagen: e.target.files[0] })
                }
              />
              <Form.Select
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
              </Form.Select>
              <Form.Select
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
              </Form.Select>
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

export default ProductosCRUD;
