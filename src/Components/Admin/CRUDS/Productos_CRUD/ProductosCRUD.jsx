import { useState, useEffect } from 'react'
import {
  getAllProductosSinTallas,
  deleteProducto,
} from '../../../../Functions/ProductosFunctions'
import { getAllTipoProductos } from '../../../../Functions/TipoProductosFunctions'
import { getAllMarcas } from '../../../../Functions/MarcasFunctions'
import ProductosPopUp from './ProductosCRUD_popup'
import { Col, Button, Accordion, Image, Badge } from 'react-bootstrap'

const baseUrl = import.meta.env.VITE_NAME

const ProductoCRUD = () => {
  //#region Declaracion useState's
  const [productos, setProductos] = useState([])
  const [marcas, setMarcas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [selectedProducto, setSelectedProducto] = useState({})
  //#endregion

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    try {
      const productoResponse = await getAllProductosSinTallas()
      setProductos(productoResponse.data)

      const responseMarcas = await getAllMarcas()
      setMarcas(responseMarcas.data)

      const responseCategorias = await getAllTipoProductos()
      setCategorias(responseCategorias.data)
    } catch (e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  //#endregion

  const openPopup = (producto) => {
    setSelectedProducto(producto)
    setPopUp(true)
  }
  //#endregion

  //#region Handle elminar cliente
  const handleDelete = async (idProducto) => {
    try {
      const response = await deleteProducto(idProducto)
      console.log('Tipo producto eliminado', response)
      setPopUp(false)
    } catch (e) {
      return e.message
    }
    fetchData()
  }
  //#endregion

  return (
    <>
      <Col xs={12}>
        <Button
          variant="outline-light"
          className="mt-3"
          onClick={() => openPopup(null)}
        >
          Crear producto
        </Button>
        <Accordion className="mt-3">
          {productos.map((producto) => (
            <Accordion.Item eventKey={producto.id} key={producto.id}>
              <Accordion.Header>
                <Badge className="me-2">{producto.id}</Badge>{' '}
                <strong>{producto.marcas.nombre}</strong>
                {' | ' + producto.nombre}
              </Accordion.Header>
              <Accordion.Body>
                <Image
                  fluid
                  className="producto-preview me-3 mb-3"
                  src={`${baseUrl}${producto.rutaImagen}`}
                />
                <ul className="list-unstyled ">
                  <li>{producto.descripcion}</li>
                  <li>
                    <strong>Categoría: </strong>
                    {producto.tipo_producto.nombre}
                  </li>
                </ul>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(producto)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(producto.id)}
                >
                  Borrar
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
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
        ) : (
          <></>
        )
        //#endregion
      }
    </>
  )
}

export default ProductoCRUD
