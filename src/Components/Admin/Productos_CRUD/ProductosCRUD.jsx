import { useState, useEffect } from 'react'
import { Col, Row, Accordion, Spinner, FormControl } from 'react-bootstrap'

import { getAllProductosAdmin } from '../../../Functions/ProductosFunctions'

import ProductosPopUp from './ProductosCRUD_popup'
import PopUpEditarPrecio from './PopUpEditPrecio'
import ProductoCard from './ProductoCard'

import { BotonSecundario } from '../../../ui'

import { PiPlusCircleBold } from 'react-icons/pi'

const ProductoCRUD = ({ showToast }) => {
  const [categorias, setCategorias] = useState([])
  const [showProducto, setShowProducto] = useState({})
  const [filteredCategorias, setFilteredCategorias] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleShowProducto = (productId) => {
    setShowProducto((prevProductos) => ({
      ...prevProductos,
      [productId]: true,
    }))
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getAllProductosAdmin()
      if (data.data) {
        setCategorias(data.data)
        setFilteredCategorias(data.data)
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

  // Filtrar productos según el término de búsqueda
  useEffect(() => {
    const filteredData = categorias
      .map((categoria) => ({
        ...categoria,
        productos: categoria.productos.filter((producto) =>
          producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((categoria) => categoria.productos.length > 0)

    setFilteredCategorias(filteredData)
  }, [searchTerm, categorias])

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
          <div className="d-flex">
            <FormControl
              placeholder="Buscar"
              style={{ maxWidth: '300px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* <Boton variant="light" onClick={() => setPopUpEditarPrecio(true)}>
              Editar grupos de precio
            </Boton> */}
          </div>
        </div>
        {filteredCategorias.map((categoria, index) => (
          <Row className="py-3" key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0 fw-bold">{categoria.categoria}</h4>
              <div className="d-flex">
                <BotonSecundario className="me-2" onClick={() => openPopup()}>
                  Añadir <PiPlusCircleBold className="ms-2" />
                </BotonSecundario>
              </div>
            </div>
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
