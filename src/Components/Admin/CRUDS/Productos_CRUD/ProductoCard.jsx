import { useState, useEffect } from 'react'
import { Col, Row, Button, Image, Badge, Spinner, Ratio } from 'react-bootstrap'

import { getProductoById } from '../../../../Functions/ProductosFunctions'

import PopUpBorrar from './PopUpBorrar'
import ImagenesCRUD_popup from './ImagenesCRUD_popup'
import ProductosPopUp from './ProductosCRUD_popup'
import TallaProductoCreate_popup from './TallaProductosCreate_popup'
import PopUpBorrarTallaProducto from './PopUpBorrarTallaProducto'
import PopUpEditPrecio from '../PopUpEditPrecio'

import { PiTrashBold, PiNotePencilBold } from 'react-icons/pi'

const ProductoCard = ({ id, onProductUpdate }) => {
  const [producto, setProducto] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const producto = await getProductoById(id)
    setProducto(producto.data)
  }

  const [popUp, setPopUp] = useState(false)
  const [popUpTalla, setPopUpTalla] = useState(false)
  const [popUpImagenes, setPopUpImagenes] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [popUpBorrarTallaProducto, setPopUpBorrarTallaProducto] =
    useState(false)
  const [popUpEditarPrecio, setPopUpEditarPrecio] = useState(false)
  const [selectedProducto, setSelectedProducto] = useState({})
  const [selectedCategoria, setSelectedCategoria] = useState()
  const [selectedTallaProducto, setSelectedTallaProducto] = useState(null)

  const openPopup = (producto, IDcategoria) => {
    setSelectedCategoria(IDcategoria)
    setSelectedProducto(producto)
    setPopUp(true)
  }

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

  const [imagenErrors, setImagenErrors] = useState({})
  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  return (
    <>
      {producto ? (
        <>
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
                    src={producto.rutaImagen}
                    onError={() => handleImageError(producto.id)}
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
                  {producto.tipo_producto?.nombre}
                </li>
              </ul>
            </Col>
          </Row>
          <div className="mb-2">
            <Button
              variant="primary"
              size="sm"
              className="me-1 mb-1"
              onClick={() => openPopup(producto, producto.tipo_producto.id)}
            >
              Editar producto
            </Button>{' '}
            <Button
              variant="secondary"
              size="sm"
              className="me-1 mb-1"
              onClick={() => openPopUpImagenes(producto)}
            >
              Editar carrusel de imágenes
            </Button>
          </div>
          <Row className="mt-2">
            <h6 className="mb-2 fw-bold">Medidas:</h6>
            {producto.productos_tallas &&
            producto.productos_tallas.length > 0 ? (
              producto.productos_tallas.map((talla) => (
                <Col xs="12" className="border rounded p-3 mb-2" key={talla.id}>
                  <ul className="list-unstyled d-flex justify-content-between align-items-end mb-1 pb-2 border-bottom">
                    <li className="mb-1 d-flex align-items-center">
                      {talla.stock ? (
                        <Badge
                          bg="success"
                          className="me-1"
                          style={{
                            fontSize: '.75rem',
                            letterSpacing: '.5px',
                          }}
                        >
                          En stock
                        </Badge>
                      ) : (
                        <Badge
                          bg="secondary"
                          className="me-1"
                          style={{
                            fontSize: '.75rem',
                            letterSpacing: '.5px',
                          }}
                        >
                          Sin stock
                        </Badge>
                      )}
                      <p className="mb-0 text-uppercase fw-bold text-gray">
                        {talla.tallas.nombre ? talla.tallas.nombre : 'Medida'}
                      </p>
                    </li>
                    <li>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="ms-1"
                        onClick={() => openPopupTalla(talla, producto)}
                      >
                        <PiNotePencilBold />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-1"
                        onClick={() =>
                          openPopUpBorrarTallaProducto(talla, producto)
                        }
                      >
                        <PiTrashBold />
                      </Button>
                    </li>
                  </ul>
                  <ul className="list-unstyled d-flex justify-content-between align-items-end mb-0">
                    <li className="text-muted">{talla.tallas.dimensiones}</li>
                    <li className="fw-semibold">${talla.precio}</li>
                  </ul>
                </Col>
              ))
            ) : (
              <p className="fst-italic texto-14 mb-4 mt-0">
                Este producto no tiene medidas vinculadas, por favor cree una
                para que el producto sea mostrado en el catálogo.
              </p>
            )}
            <Button
              className="w-100"
              size="sm"
              variant="outline-secondary"
              onClick={() => openPopupTalla(null, producto)}
            >
              + Agregar medida
            </Button>
            <Button
              className="w-100 mt-1"
              size="sm"
              variant="outline-danger"
              onClick={() => openPopUpBorrar(producto)}
            >
              Borrar producto
            </Button>
          </Row>
        </>
      ) : (
        <Spinner className="my-3 d-block mx-auto" animation="border" />
      )}
      {popUp ? (
        <ProductosPopUp
          producto={selectedProducto}
          selectedCategoria={selectedCategoria}
          onProductoUpdated={() => {
            onProductUpdate()
            fetchData()
          }}
          closePopUp={() => setPopUp(false)}
        />
      ) : (
        <></>
      )}
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
      {popUpEditarPrecio && (
        <PopUpEditPrecio
          closePopUp={() => {
            setPopUpEditarPrecio(false)
          }}
        />
      )}
    </>
  )
}

export default ProductoCard
