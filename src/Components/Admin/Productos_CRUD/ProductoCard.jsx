import { useState, useEffect } from 'react'
import { Col, Row, Image, Spinner, Ratio } from 'react-bootstrap'

import {
  getProductoById,
  deleteProducto,
} from '../../../Functions/ProductosFunctions'
import { deleteTallaProducto } from '../../../Functions/TallasProductosFunctions'

import { PopUp, Boton } from '../../../ui'

import ImagenesCRUD_popup from './ImagenesCRUD_popup'
import ProductosPopUp from './ProductosCRUD_popup'
import TallaProductoCreate_popup from './TallaProductosCreate_popup'
import PopUpEditPrecio from './PopUpEditPrecio'

import { PiCheckCircleDuotone, PiXCircleDuotone } from 'react-icons/pi'

const ProductoCard = ({ id, onProductUpdate, showToast }) => {
  const [producto, setProducto] = useState()
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
  const [imagenErrors, setImagenErrors] = useState({})

  const fetchData = async () => {
    const producto = await getProductoById(id)
    setProducto(producto.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

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

  const handleDeleteProducto = async () => {
    try {
      const response = await deleteProducto(selectedProducto.id)
      console.log('Producto eliminado', response)
      showToast(
        'success',
        'Producto eliminado',
        'El producto ha sido eliminado con éxito.'
      )
      onProductUpdate()
      fetchData()
      setPopUpBorrar(false)
    } catch (e) {
      showToast('danger', 'Error', 'Hubo un problema al eliminar un producto.')
      console.error(e.message)
    }
  }

  const handleDeleteTallaProducto = async () => {
    try {
      const response = await deleteTallaProducto(selectedTallaProducto.id)
      console.log('Talla producto eliminada', response)
      showToast(
        'success',
        'Medida del producto eliminada',
        'La medida del producto ha sido eliminada con éxito.'
      )
      fetchData()
      setPopUpBorrarTallaProducto(false)
    } catch (e) {
      showToast(
        'danger',
        'Error',
        'Hubo un problema al eliminar la medida del producto.'
      )
      console.error(e.message)
    }
  }

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
          <Row>
            <Col xs={12} sm={6} className="position-relative">
              <Ratio aspectRatio="4x3" className="rounded-3">
                {imagenErrors[producto.id] ? (
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center border  rounded-3">
                    <p className="mb-0 color-grisclaro">
                      <strong>Sin imágen</strong>
                    </p>
                  </div>
                ) : (
                  <Image
                    fluid
                    className="object-fit-cover rounded-3"
                    src={producto.rutaImagen}
                    onError={() => handleImageError(producto.id)}
                  />
                )}
              </Ratio>
              <Boton
                className="position-absolute bottom-0 left-0 mb-2 ms-2 z-3"
                size="sm"
                onClick={() => openPopUpImagenes(producto)}
              >
                Editar carrusel
              </Boton>
            </Col>
            <Col
              xs={12}
              sm={6}
              className="d-flex flex-column justify-content-around"
            >
              <div>
                <ul className="list-unstyled mb-1">
                  <li className="">
                    <strong>Marca</strong>
                  </li>
                  <li className="lh-sm">
                    {producto.marcas?.nombre || 'Sin marca'}
                  </li>
                </ul>
                <ul className="list-unstyled mb-1">
                  <li className="">
                    <strong>Categoría</strong>
                  </li>
                  <li className="lh-sm">{producto.tipo_producto?.nombre}</li>
                </ul>
                <ul className="list-unstyled">
                  <li className="">
                    <strong>Descripción</strong>
                  </li>
                  <li className="lh-sm fst-italic">{producto.descripcion}</li>
                </ul>
              </div>
              <div>
                <button
                  className="fw-semibold text-primary ps-0 pe-4 bg-transparent border-end"
                  onClick={() => openPopup(producto, producto.tipo_producto.id)}
                >
                  Editar
                </button>
                <button
                  className="fw-semibold text-primary px-4 bg-transparent"
                  onClick={() => openPopUpBorrar(producto)}
                >
                  Borrar
                </button>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            {producto.productos_tallas &&
            producto.productos_tallas.length > 0 ? (
              producto.productos_tallas.map((talla) => (
                <Col xs="12" key={talla.id}>
                  <div className="my-1 pt-1">
                    <div className="d-flex justify-content-between align-items-center border rounded-top bg-secondary-subtle">
                      <div className="d-flex align-items-center">
                        <p className="texto-14 lh-1 fw-semibold text-muted mb-0 ps-3">
                          STOCK
                        </p>{' '}
                        {talla.stock ? (
                          <PiCheckCircleDuotone className="text-success fs-5 ms-1" />
                        ) : (
                          <PiXCircleDuotone className="text-danger fs-5 ms-1" />
                        )}
                      </div>
                      <div className="d-flex align-items-center">
                        <button
                          className="bg-transparent texto-14 border-start px-3 fw-semibold text-muted"
                          onClick={() => openPopupTalla(talla, producto)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-transparent texto-14 border-start px-3 fw-semibold text-muted"
                          onClick={() =>
                            openPopUpBorrarTallaProducto(talla, producto)
                          }
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                    <div className="border border-top-0 rounded-bottom px-3 py-2">
                      <ul className="list-unstyled d-flex justify-content-between align-items-end mb-0">
                        <li>
                          <strong className="text-muted">
                            {talla.tallas.nombre ? talla.tallas.nombre : ''}
                          </strong>{' '}
                          {talla.dimensiones}
                        </li>
                        <li className="fw-bold">${talla.precio}</li>
                      </ul>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <Col xs={12}>
                <p className="fst-italic texto-14 mb-2 mt-0">
                  Este producto no tiene medidas vinculadas, por favor cree una
                  para que el producto sea mostrado en el catálogo.
                </p>
              </Col>
            )}
            <Col xs={12} className="mt-1">
              <button
                className="w-100 rounded texto-14 bg-white py-1 fw-semibold text-muted"
                style={{ border: '2px dashed var(--bs-border-color)' }}
                onClick={() => openPopupTalla(null, producto)}
              >
                + Agregar medida
              </button>
            </Col>
          </Row>
        </>
      ) : (
        <Spinner className="my-3 d-block mx-auto" animation="border" />
      )}
      {popUp && (
        <ProductosPopUp
          producto={selectedProducto}
          selectedCategoria={selectedCategoria}
          onProductoUpdated={() => {
            onProductUpdate()
            fetchData()
          }}
          closePopUp={() => setPopUp(false)}
          showToast={showToast}
        />
      )}
      {popUpTalla && (
        <TallaProductoCreate_popup
          selectedTallaProducto={selectedTallaProducto}
          producto={selectedProducto}
          onProductoUpdated={() => fetchData()}
          closePopUp={() => setPopUpTalla(false)}
          showToast={showToast}
        />
      )}
      {popUpImagenes && (
        <ImagenesCRUD_popup
          producto={selectedProducto}
          closePopUp={() => setPopUpImagenes(false)}
          showToast={showToast}
        />
      )}
      {popUpBorrar && (
        <PopUp
          header="Borrar producto"
          closePopUp={() => setPopUpBorrar(false)}
          buttonLabel="Borrar"
          onAction={handleDeleteProducto}
          variant="danger"
        >
          <p>
            ¿Está seguro que desea borrar el producto{' '}
            <strong>{selectedProducto.nombre}</strong>?
          </p>
        </PopUp>
      )}
      {popUpBorrarTallaProducto && (
        <PopUp
          header="Borrar medida de un producto"
          closePopUp={() => setPopUpBorrarTallaProducto(false)}
          buttonLabel="Borrar"
          onAction={handleDeleteTallaProducto}
          variant="danger"
        >
          <p>
            ¿Está seguro que desea borrar la medida{' '}
            <strong>
              {selectedTallaProducto.tallas.nombre}{' '}
              {selectedTallaProducto.tallas.dimensiones}
            </strong>{' '}
            del producto <strong>{selectedProducto.nombre}</strong>?
          </p>
        </PopUp>
      )}
      {popUpEditarPrecio && (
        <PopUpEditPrecio
          closePopUp={() => {
            setPopUpEditarPrecio(false)
          }}
          showToast={showToast}
        />
      )}
    </>
  )
}

export default ProductoCard
