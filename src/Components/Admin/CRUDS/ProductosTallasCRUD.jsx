import { useState, useEffect } from "react";
import { Col, Form, Button } from "react-bootstrap";

import {
  getAllProductosSinTallas,
  createProductoTalla,
} from "../../../Functions/ProductosFunctions.jsx";
import { getAllTallas } from "../../../Functions/TallasFunctions.jsx";

import './ProdutosTallasCRUD.css'

const ProductosTallasCRUD = () => {
  const [productos, setProductos] = useState([]);
  const [tallas, setTallas] = useState([]);
  const [formData, setFormData] = useState({
    productos_id: "",
    tallas_id: "",
    stock: "1",
    precio: 0,
  });

  const [selectedTalla, setSelectedTalla] = useState(null);

  const fetchData = async () => {
    try {
      const responseProductos = await getAllProductosSinTallas();
      setProductos(responseProductos.data);

      const responseTallas = await getAllTallas();
      setTallas(
        responseTallas.data.map((talla) => ({
          ...talla,
          selected: false,
          disabled: false,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateAsociacion = async () => {
    try {
      await createProductoTalla(formData);
      setFormData({
        productos_id: "",
        tallas_id: "",
        stock: "1",
        precio: 0,
      });
      setSelectedTalla(null);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTallaClick = (tallaId) => {
    const updatedTallas = tallas.map((talla) => {
      if (talla.id === tallaId) {
        return { ...talla, selected: !talla.selected };
      }
      return talla;
    });

    setTallas(updatedTallas);

    const selectedTalla = updatedTallas.find((talla) => talla.selected);
    setFormData({ ...formData, tallas_id: selectedTalla.id });
    setSelectedTalla(selectedTalla.id);
  };

  const isTallaDisabled = (tallaId) => {
    return tallas.find((talla) => talla.id === tallaId)?.disabled || false;
  };

  return (
    <>
      <Col xs={12}>
        <Form className="pt-5">
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Selecciona un Producto</Form.Label>
            <Form.Select
              value={formData.productos_id}
              onChange={(e) =>
                setFormData({ ...formData, productos_id: e.target.value })
              }
            >
              <option value="">Selecciona un Producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label className="text-white">Selecciona una Talla</Form.Label>
            <div>
                {tallas.map((talla) => (
                <Button
                    className="m-1"
                    key={talla.id}
                    variant={`outline-primary talla-button ${
                    talla.selected ? "selected" : ""
                    } ${isTallaDisabled(talla.id) ? "disabled" : ""}`}
                    onClick={() => handleTallaClick(talla.id)}
                    disabled={isTallaDisabled(talla.id)}
                >
                    {talla.nombre}
                </Button>
                ))}
            </div>
            </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Stock</Form.Label>
            <Form.Select
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            >
              <option value="1">Con Stock</option>
              <option value="0">Sin Stock</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Precio</Form.Label>
            <Form.Control
              type="number"
              value={formData.precio}
              onChange={(e) =>
                setFormData({ ...formData, precio: e.target.value })
              }
            />
          </Form.Group>

          <Button           
            variant="outline-light"
            className="primary  outline-primary" onClick={handleCreateAsociacion}>
            Guardar
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default ProductosTallasCRUD;
