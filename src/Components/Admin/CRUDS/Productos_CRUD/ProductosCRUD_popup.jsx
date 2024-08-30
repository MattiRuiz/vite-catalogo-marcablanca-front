import { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Modal,
  Spinner,
  Image,
  Row,
  Col,
  Ratio,
} from 'react-bootstrap'

import {
  createProducto,
  updateProducto,
} from '../../../../Functions/ProductosFunctions'
import { getAllMarcas } from '../../../../Functions/MarcasFunctions'
import { getAllTipoProductos } from '../../../../Functions/TipoProductosFunctions'

import { PiGearSixDuotone, PiPlusCircleDuotone } from 'react-icons/pi'

const ProductosCRUD_popup = ({
  producto,
  selectedCategoria,
  onProductoUpdated,
  closePopUp,
  showToast,
}) => {
  const [productoData, setProductoData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
    marcasId: '',
    tipoProductoId: '',
    adminsId: '',
  })
  const [marcas, setMarcas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingImagen, setLoadingImagen] = useState(false)

  useEffect(() => {
    if (producto) {
      setProductoData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        imagen: producto.imagen,
        marcasId: producto.marcas ? producto.marcas.id : '',
        tipoProductoId: selectedCategoria,
        adminsId: 1,
      })
    }
  }, [producto])

  const fetchData = async () => {
    setLoading(true)
    try {
      const responseMarcas = await getAllMarcas()
      setMarcas(responseMarcas.data)
      const responseCategorias = await getAllTipoProductos()
      setCategorias(responseCategorias.data)
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

  const handleGuardar = async () => {
    setLoading(true)

    const dataToSend = {
      ...productoData,
    }
    const formDataForAPI = new FormData()
    formDataForAPI.append('nombre', dataToSend.nombre)
    formDataForAPI.append('descripcion', dataToSend.descripcion)
    formDataForAPI.append('imagen', dataToSend.imagen)
    formDataForAPI.append('marcas_id', dataToSend.marcasId)
    formDataForAPI.append('tipo_producto_id', dataToSend.tipoProductoId)
    formDataForAPI.append('admins_id', dataToSend.adminsId)

    if (producto) {
      const id = producto.id
      const response = await updateProducto(id, formDataForAPI)
      setLoading(false)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al querer actualizar el producto'
        )
      } else {
        showToast(
          'success',
          'Producto actualizado',
          'El producto ha sido actualizada con éxito'
        )
        onProductoUpdated()
        closePopUp()
      }
    } else {
      const response = await createProducto(formDataForAPI)
      setLoading(false)
      if (response.status === 200) {
        showToast(
          'success',
          'Producto creado',
          'El producto ha sido creado con éxito.'
        )
        onProductoUpdated()
        closePopUp()
      } else {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al crear un nuevo producto.'
        )
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductoData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCambiarImagen = async (event) => {
    setLoadingImagen(true)

    const dataToSend = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      imagen: event.target.files[0],
      marcasId: producto.marcas.id,
      tipoProductoId: selectedCategoria,
      adminsId: 1,
    }
    const formDataForAPI = new FormData()
    formDataForAPI.append('nombre', dataToSend.nombre)
    formDataForAPI.append('descripcion', dataToSend.descripcion)
    formDataForAPI.append('imagen', dataToSend.imagen)
    formDataForAPI.append('marcas_id', dataToSend.marcasId)
    formDataForAPI.append('tipo_producto_id', dataToSend.tipoProductoId)
    formDataForAPI.append('admins_id', dataToSend.adminsId)

    const id = producto.id

    try {
      const response = await updateProducto(id, formDataForAPI)
      console.log('Imagen editada', response)
      showToast(
        'success',
        'Imagen editada',
        'La imagen ha sido editada con éxito.'
      )
      onProductoUpdated()
      closePopUp()
    } catch (e) {
      showToast('danger', 'Error', 'Hubo un problema al reemplazar la imagen.')
      console.error(e.message)
    }
    setLoadingImagen(false)
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="pb-2 border-0 bg-secondary-subtle" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          {producto ? (
            <>
              <PiGearSixDuotone className="me-2" /> Editar un producto
            </>
          ) : (
            <>
              <PiPlusCircleDuotone className="me-2" /> Añadir un producto
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              Nombre del producto<span className="text-danger">*</span>:
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Nombre"
              name="nombre"
              value={productoData.nombre}
              onChange={handleInputChange}
            />
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Descripción"
              name="descripcion"
              value={productoData.descripcion}
              onChange={handleInputChange}
            />
            <Form.Label>
              Tipo de producto<span className="text-danger">*</span>:
            </Form.Label>
            <Form.Select
              className="mb-3"
              value={productoData.tipoProductoId}
              onChange={(e) =>
                setProductoData({
                  ...productoData,
                  tipoProductoId: e.target.value,
                })
              }
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>
            <Form.Label>Marca:</Form.Label>
            <Form.Select
              className="mb-3"
              value={productoData.marcasId}
              onChange={(e) =>
                setProductoData({ ...productoData, marcasId: e.target.value })
              }
            >
              <option value="">Selecciona una marca</option>
              {marcas.map((marca) => (
                <option key={marca.id} value={marca.id}>
                  {marca.nombre}
                </option>
              ))}
            </Form.Select>
            {producto ? (
              <Row className="justify-content-center">
                <Col
                  xs={4}
                  className="px-0 border border-end-0"
                  style={{ borderRadius: '8px 0 0 8px' }}
                >
                  <Ratio aspectRatio="1x1">
                    <Image
                      style={{ borderRadius: '8px 0 0 8px' }}
                      fluid
                      className="object-fit-cover"
                      src={producto.rutaImagen}
                    />
                  </Ratio>
                </Col>
                <Col
                  xs={7}
                  className="d-flex align-items-start flex-column justify-content-center border border-start-0"
                  style={{ borderRadius: '0 8px 8px 0' }}
                >
                  <p className="mb-2">
                    Imágen de portada<span className="text-danger">*</span>:
                  </p>
                  <label htmlFor="fileInput">
                    <Button as="span" className="bg-gradient border-0">
                      {loadingImagen ? (
                        <Spinner
                          animation="border"
                          variant="light"
                          size="sm"
                          className="mx-4"
                        />
                      ) : (
                        'Cambiar imagen'
                      )}
                    </Button>
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleCambiarImagen}
                    />
                  </label>
                </Col>
              </Row>
            ) : (
              <>
                <Form.Label>
                  Imágen de portada<span className="text-danger">*</span>:
                </Form.Label>
                <Form.Control
                  className="mb-3"
                  type="file"
                  name="imagen"
                  onChange={(e) =>
                    setProductoData({
                      ...productoData,
                      imagen: e.target.files[0],
                    })
                  }
                />
              </>
            )}
          </Form.Group>
        </Form>
        <p className="mb-0 mt-2 texto-14">
          <span className="text-danger">*</span> Elementos obligatorios
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="secondary"
          className="bg-gradient border-0"
          onClick={() => closePopUp()}
        >
          Cancelar
        </Button>
        {producto ? (
          <Button
            onClick={handleGuardar}
            disabled={loading}
            className="bg-gradient border-0"
          >
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              'Guardar cambios'
            )}
          </Button>
        ) : (
          <Button
            className="bg-gradient border-0"
            onClick={handleGuardar}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              'Crear Producto'
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ProductosCRUD_popup
