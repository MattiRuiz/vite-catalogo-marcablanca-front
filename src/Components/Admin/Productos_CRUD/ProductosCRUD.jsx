import { useState, useEffect } from 'react'
import { Col, Row, Accordion, Spinner } from 'react-bootstrap'

import { getAllProductosAdmin } from '../../../Functions/ProductosFunctions'

import ProductosPopUp from './ProductosCRUD_popup'
import PopUpEditarPrecio from './PopUpEditPrecio'
import ProductoCard from './ProductoCard'

import { Boton } from '../../../ui'

const ProductoCRUD = ({ showToast }) => {
  const [categorias, setCategorias] = useState([])

  const [showProducto, setShowProducto] = useState({})
  const handleShowProducto = (productId) => {
    setShowProducto((prevProductos) => ({
      ...prevProductos,
      [productId]: true,
    }))
  }

  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getAllProductosAdmin()
      if (data.data) {
        setCategorias(data.data)
      }
    } catch (e) {
      showToast(
        'danger',
        'Problema de carga',
        'Hubo un problema al actualizar la información.'
      )
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [popUp, setPopUp] = useState(false)
  const openPopup = () => {
    setPopUp(true)
  }

  const [popUpEditarPrecio, setPopUpEditarPrecio] = useState(false)

  return (
    <>
      <Col xs={12}>
        <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
          <h2 className="mb-0 fw-bold">Productos</h2>
          <div>
            <Boton className="me-2" onClick={() => openPopup()}>
              Crear producto
            </Boton>
            <Boton variant="light" onClick={() => setPopUpEditarPrecio(true)}>
              Editar grupos de precio
            </Boton>
          </div>
        </div>
        {categorias.map((categoria) => (
          <Row className="py-3" key={categoria.id}>
            <h4 className="mb-0 fw-bold">{categoria.categoria}</h4>
            {categoria.productos.map((producto) => (
              <Col key={`col-${producto.id}`} xs={12} md={6}>
                <Accordion className="mt-2">
                  <Accordion.Item
                    eventKey={`event-${producto.id}`}
                    key={`acc-${producto.id}`}
                  >
                    <Accordion.Header
                      className="d-flex align-items-center"
                      onClick={() => handleShowProducto(producto.id)}
                    >
                      {producto.nombre}
                      {producto.marca === 'Otros' ? (
                        ''
                      ) : (
                        <strong className="ms-1"> - {producto.marca}</strong>
                      )}
                    </Accordion.Header>
                    <Accordion.Body>
                      {showProducto[producto.id] && (
                        <ProductoCard
                          id={producto.id}
                          onProductUpdate={() => fetchData()}
                          showToast={showToast}
                        />
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            ))}
          </Row>
        ))}
        {loading && (
          <Spinner
            variant="dark"
            className="my-5 d-block mx-auto"
            animation="border"
          />
        )}
      </Col>
      {popUp && (
        <ProductosPopUp
          onProductoUpdated={() => fetchData()}
          closePopUp={() => setPopUp(false)}
          showToast={showToast}
        />
      )}
      {popUpEditarPrecio && (
        <PopUpEditarPrecio
          onProductoUpdated={() => fetchData()}
          closePopUp={() => setPopUpEditarPrecio(false)}
          showToast={showToast}
        />
      )}
    </>
  )
}

export default ProductoCRUD
