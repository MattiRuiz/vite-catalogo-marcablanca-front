import { useState, useEffect } from 'react'
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

import {
  getAllProductosSinTallas,
  getAllProductos,
} from '../../../../Functions/ProductosFunctions'
import { getAllMarcas } from '../../../../Functions/MarcasFunctions'

import PopUpBorrar from './PopUpBorrar'
import ImagenesCRUD_popup from './ImagenesCRUD_popup'
import ProductosPopUp from './ProductosCRUD_popup'
import TallaProductoCreate_popup from './TallaProductosCreate_popup'
import PopUpBorrarTallaProducto from './PopUpBorrarTallaProducto'

const baseUrl = import.meta.env.VITE_NAME

const ProductoCRUD = () => {
  //#region Declaracion useState's
  const [productos, setProductos] = useState([])
  const [marcas, setMarcas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [popUpTalla, setPopUpTalla] = useState(false)
  const [popUpImagenes, setPopUpImagenes] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [popUpBorrarTallaProducto, setPopUpBorrarTallaProducto] =
    useState(false)
  const [selectedProducto, setSelectedProducto] = useState({})
  const [selectedCategoria, setSelectedCategoria] = useState()
  const [selectedIdProducto, setSelectedIdProducto] = useState()
  const [selectedTallaProducto, setSelectedTallaProducto] = useState(null)
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

  const openPopupTalla = (productoTalla, producto) => {
    setSelectedProducto(producto)
    setSelectedTallaProducto(productoTalla)
    setPopUpTalla(true)
  }

  const openPopUpBorrar = (producto) => {
    setSelectedProducto(producto)
    setPopUpBorrar(true)
  }

  const openPopUpImagenes = (producto) => {
    setSelectedProducto(producto)
    setPopUpImagenes(true)
  }

  const openPopUpBorrarTallaProducto = (productoTalla, producto) => {
    setSelectedTallaProducto(productoTalla)
    setSelectedProducto(producto)
    setPopUpBorrarTallaProducto(true)
  }

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
              <h3 className="mt-4 mb-0 pb-2 text-white border-bottom">
                {categoria.nombre}
              </h3>
              <Row>
                {categoria.productos.map((producto) => (
                  <Col key={producto.id} xs={12} md={6}>
                    <Accordion className="mt-3">
                      <Accordion.Item eventKey={producto.id}>
                        <Accordion.Header>
                          <Badge className="me-3">{producto.id}</Badge>{' '}
                          <ul className="list-unstyled mb-0">
                            <li className="texto-14">
                              {producto.marcas.nombre}
                            </li>
                            <li>
                              <strong>{producto.nombre}</strong>
                            </li>
                          </ul>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row className="align-items-center">
                            <Col xs={12} sm={6}>
                              <Ratio aspectRatio="4x3" className="mb-3 mx-auto">
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
                                    onError={() =>
                                      handleImageError(producto.id)
                                    }
                                  />
                                )}
                              </Ratio>
                            </Col>
                            <Col xs={12} sm={6}>
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
                            </Col>
                          </Row>
                          <Button
                            variant="success"
                            size="sm"
                            className="me-1"
                            onClick={() => openPopUpImagenes(producto)}
                          >
                            Editar imágenes
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-1"
                            onClick={() => openPopup(producto, categoria.id)}
                          >
                            Editar producto
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => openPopUpBorrar(producto)}
                          >
                            Borrar
                          </Button>

                          <Row className="mt-4 border-top pt-4">
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
                                      {talla.stock ? (
                                        <>
                                          <Badge
                                            bg="success"
                                            size="sm"
                                            className="mb-1"
                                          >
                                            En stock
                                          </Badge>
                                          <p className="mb-0">
                                            {talla.tallas.nombre}
                                          </p>
                                        </>
                                      ) : (
                                        <>
                                          <Badge
                                            bg="danger"
                                            size="sm"
                                            className="mb-1"
                                          >
                                            Sin stock
                                          </Badge>
                                          <p className="mb-0">
                                            {talla.tallas.nombre}
                                          </p>
                                        </>
                                      )}
                                    </li>
                                    <li className="mb-2">
                                      <Button
                                        variant="warning"
                                        size="sm"
                                        className="ms-1"
                                        onClick={() =>
                                          openPopupTalla(talla, producto)
                                        }
                                      >
                                        <span className="material-symbols-outlined text-dark">
                                          edit
                                        </span>
                                      </Button>
                                      <Button
                                        variant="danger"
                                        size="sm"
                                        className="ms-1"
                                        onClick={() =>
                                          openPopUpBorrarTallaProducto(
                                            talla,
                                            producto
                                          )
                                        }
                                      >
                                        <span className="material-symbols-outlined">
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
                              <p className="fst-italic texto-14 mb-4 mt-0">
                                Este producto no tiene medidas vinculadas, por
                                favor cree una para que el producto sea mostrado
                                en el catálogo.
                              </p>
                            )}
                            <Button
                              className="w-100"
                              variant="outline-secondary"
                              onClick={() => openPopupTalla(null, producto)}
                            >
                              + Agregar medida
                            </Button>
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
      {popUpTalla ? (
        <TallaProductoCreate_popup
          selectedTallaProducto={selectedTallaProducto}
          producto={selectedProducto}
          onProductoUpdated={() => fetchData()}
          closePopUp={() => setPopUpTalla(false)}
        />
      ) : (
        <></>
      )}
      {popUpImagenes ? (
        <ImagenesCRUD_popup
          producto={selectedProducto}
          closePopUp={() => setPopUpImagenes(false)}
        />
      ) : (
        <></>
      )}
      {popUpBorrar ? (
        <PopUpBorrar
          producto={selectedProducto}
          onProductoUpdated={() => fetchData()}
          closePopUp={() => setPopUpBorrar(false)}
        />
      ) : (
        <></>
      )}
      {popUpBorrarTallaProducto ? (
        <PopUpBorrarTallaProducto
          talla={selectedTallaProducto}
          producto={selectedProducto}
          onDataUpdated={() => fetchData()}
          closePopUp={() => setPopUpBorrarTallaProducto(false)}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default ProductoCRUD
