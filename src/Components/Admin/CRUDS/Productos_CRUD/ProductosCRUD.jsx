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
        <div className="mb-2 border-bottom pb-2">
          <Button
            className="mb-1 me-2 bg-gradient border-0"
            onClick={() => openPopup()}
          >
            Crear producto
          </Button>
          <Button
            variant="light"
            className="mb-1 border-0"
            onClick={() => setPopUpEditarPrecio(true)}
          >
            Editar grupos de precio
          </Button>
        </div>
        {categorias.map((categoria) => (
          <Row className="py-3" key={categoria.id}>
            <h4 className="mb-0 fw-bold">{categoria.categoria}</h4>
            {categoria.productos.map((producto) => (
              <Col key={producto.id} xs={12} md={6}>
                <Accordion className="mt-2">
                  <Accordion.Item eventKey={producto.id} className="">
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
