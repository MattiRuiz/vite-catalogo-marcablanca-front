import { useState, useEffect } from 'react'
import {
  getAllProductosSinTallas,
  getAllProductos,
  deleteProducto,
} from '../../../../Functions/ProductosFunctions'
import { getAllTipoProductos } from '../../../../Functions/TipoProductosFunctions'
import { getAllMarcas } from '../../../../Functions/MarcasFunctions'
import ProductosPopUp from './ProductosCRUD_popup'
import {
  Col,
  Row,
  Button,
  Accordion,
  Image,
  Badge,
  Spinner,
  Ratio,
  Form,
} from 'react-bootstrap'

const baseUrl = import.meta.env.VITE_NAME

const ProductoCRUD = () => {
  //#region Declaracion useState's
  const [productos, setProductos] = useState([])
  const [marcas, setMarcas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [selectedProducto, setSelectedProducto] = useState({})
  const [selectedCategoria, setSelectedCategoria] = useState()
  //#endregion

  const [imagenErrors, setImagenErrors] = useState({})
  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  const [loading, setLoading] = useState(false)

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    setLoading(true)
    try {
      const productoResponse = await getAllProductosSinTallas()
      setProductos(productoResponse.data)

      const responseMarcas = await getAllMarcas()
      setMarcas(responseMarcas.data)

      const responseCategorias = await getAllProductos()
      setCategorias(responseCategorias.data)
    } catch (e) {
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  //#endregion

  const openPopup = (producto, IDcategoria) => {
    setSelectedCategoria(IDcategoria)
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
        <Row>
          {categorias.map((categoria) => (
            <Col key={categoria.id} xs={12} className="mb-1">
              <h3 className="mt-4 mb-0 text-white">{categoria.nombre}</h3>
              <Row>
                {categoria.productos.map((producto) => (
                  <Col key={producto.id} xs={12} md={6}>
                    <Accordion className="mt-3">
                      <Accordion.Item eventKey={producto.id}>
                        <Accordion.Header>
                          <Badge className="me-3">
                            {categoria.id + producto.id}
                          </Badge>{' '}
                          <ul className="list-unstyled mb-0">
                            <li className="texto-14">marca</li>
                            <li>
                              <strong>{producto.nombre}</strong>
                            </li>
                          </ul>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Ratio
                            aspectRatio="1x1"
                            className="producto-preview me-3 mb-3"
                          >
                            {imagenErrors[producto.id] ? (
                              // Mostrar elemento alternativo en caso de error
                              <div className="w-100 h-100 d-flex align-items-center justify-content-center border">
                                <p className="mb-0 color-grisclaro">
                                  <strong>Sin imágen</strong>
                                </p>
                              </div>
                            ) : (
                              <Image
                                fluid
                                className="object-fit-cover"
                                src={`${baseUrl}${producto.rutaImagen}`}
                                onError={() => handleImageError(producto.id)}
                              />
                            )}
                          </Ratio>
                          <ul className="list-unstyled">
                            <li>
                              <strong>Descripción: </strong>
                              {producto.descripcion}
                            </li>
                            <li>
                              <strong>Categoría: </strong>
                              {categoria.nombre}
                            </li>
                          </ul>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-1"
                            onClick={() => openPopup(producto, categoria.id)}
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

                          <Row className="mt-4">
                            <h6 className="mb-2 fw-bold">Medidas:</h6>

                            {producto.productos_tallas &&
                            producto.productos_tallas.length > 0 ? (
                              producto.productos_tallas.map((talla) => (
                                <Col
                                  xs="12"
                                  className="border rounded p-3 mb-2"
                                  key={talla.id}
                                >
                                  <ul className="list-unstyled d-flex justify-content-between align-items-center mb-1 border-bottom">
                                    <li className="mb-1 text-uppercase fw-bold text-gray">
                                      <Form>
                                        <Form.Check
                                          type="checkbox"
                                          label={talla.tallas.nombre}
                                        />
                                      </Form>
                                    </li>

                                    <li className="mb-2">
                                      <Button variant="danger" size="sm">
                                        <span class="material-symbols-outlined">
                                          delete
                                        </span>
                                      </Button>
                                    </li>
                                  </ul>
                                  <ul className="list-unstyled d-flex justify-content-between align-items-end mb-0">
                                    <li className="text-muted">
                                      {talla.tallas.dimensiones}
                                    </li>

                                    <li className="fw-semibold">
                                      ${talla.precio}
                                    </li>
                                  </ul>
                                </Col>
                              ))
                            ) : (
                              <p>No hay tallas disponibles</p>
                            )}
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                ))}
              </Row>
            </Col>
          ))}
        </Row>

        {loading ? (
          <Spinner
            variant="light"
            className="my-5 d-block mx-auto"
            animation="border"
          />
        ) : (
          ''
        )}
      </Col>
      {
        //#region Renderizado condicional PopUp
        popUp ? (
          <ProductosPopUp
            producto={selectedProducto}
            marcas={marcas}
            categorias={categorias}
            selectedCategoria={selectedCategoria}
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
