import { useState, useEffect } from 'react';
import { getAllProductosSinTallas, deleteProducto } from '../../../../Functions/ProductosFunctions';
import { getAllTipoProductos } from '../../../../Functions/TipoProductosFunctions';
import { getAllMarcas } from '../../../../Functions/MarcasFunctions';
import ProductosPopUp from './ProductosCRUD_popup';
import { Col, Button } from 'react-bootstrap';

const ProductoCRUD = () => {
  //#region Declaracion useState's
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({});
  //#endregion

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    try {
      const productoResponse = await getAllProductosSinTallas();
      setProductos(productoResponse.data);

      const responseMarcas = await getAllMarcas();
      setMarcas(responseMarcas.data);

      const responseCategorias = await getAllTipoProductos();
      setCategorias(responseCategorias.data);

    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  //#endregion
  
  const openPopup = (producto) => {
    setSelectedProducto(producto);
    setPopUp(true);
  };
  //#endregion

  //#region Handle elminar cliente
  const handleDelete = async (idProducto) => {
    try{
      const response = await deleteProducto(idProducto)
      console.log('Tipo producto eliminado', response)
      setPopUp(false)
    }
    catch (e)
    {
      return e.message
    }
    fetchData();
  };
  //#endregion

  return (
    <div>
      <Col >
        <Button
          variant="outline-light"
          className="mt-3"
          onClick={() => openPopup(null)}
        >
          Crear Talla
        </Button>
        <ul className="list-group mt-3">
          {productos.map((producto) => (
            <li
              key={producto.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div className='m-0 p-0'>
                  {producto.nombre}
                  {producto.descripcion}
                <br></br>
                Marca  {producto.marcas.nombre}
                <br />
                Categoria: {producto.tipo_producto.nombre}
              </div>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(producto)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(producto.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Col>
        {  
        //#region Renderizado condicional PopUp
        popUp ? (
          <ProductosPopUp 
          producto={selectedProducto} 
          marcas={marcas} 
          categorias={categorias} 
          onProductoUpdated={() => fetchData()}
          closePopUp={() => setPopUp(false)}
          />
        ) 
        : 
        (
          <>
          </>
        )
        //#endregion
        }
    </div>
  );
};

export default ProductoCRUD;
