import { useState, useEffect } from 'react'
import { Col, Row, Button, Accordion, Badge, Spinner } from 'react-bootstrap'

import { getAllProductosAdmin } from '../../../../Functions/ProductosFunctions'

import ProductosPopUp from './ProductosCRUD_popup'
import ProductoCard from './ProductoCard'

const ProductoCRUD = () => {
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

  return (
    <>
      <Col xs={12}>
        <Button
          variant="secondary"
          className="mb-1 me-2"
          onClick={() => openPopup()}
        >
          Crear producto
        </Button>
        <Button
          variant="light"
          className="mb-1"
          onClick={() => setPopUpEditarPrecio(true)}
        >
          Editar grupos de precio
        </Button>
        {categorias.map((categoria) => (
          <Row className="py-2" key={categoria.id}>
            <h4 className="text-white pb-1 mb-0 border-bottom">
              {categoria.categoria}
            </h4>
            {categoria.productos.map((producto) => (
              <Col key={producto.id} xs={12} md={6}>
                <Accordion className="mt-2">
                  <Accordion.Item eventKey={producto.id}>
                    <Accordion.Header
                      className="d-flex align-items-center"
                      onClick={() => handleShowProducto(producto.id)}
                    >
                      <Badge className="me-2">{producto.marca}</Badge>
                      <strong>{producto.nombre}</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      {showProducto[producto.id] && (
                        <ProductoCard
                          id={producto.id}
                          onProductUpdate={() => fetchData()}
                        />
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            ))}
          </Row>
        ))}
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
      {popUp && (
        <ProductosPopUp
          onProductoUpdated={() => fetchData()}
          closePopUp={() => setPopUp(false)}
        />
      )}
    </>
  )
}

export default ProductoCRUD
