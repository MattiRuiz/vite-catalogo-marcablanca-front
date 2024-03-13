import { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Modal,
  Alert,
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

const ProductosCRUD_popup = ({
  producto,
  categorias,
  marcas,
  selectedCategoria,
  onProductoUpdated,
  closePopUp,
}) => {
  const [productoData, setProductoData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
    marcasId: '',
    tipoProductoId: '',
    adminsId: '',
  })

  const baseUrl = import.meta.env.VITE_NAME

  const [showAlert, setShowAlert] = useState(false)
  const handleShowAlert = () => setShowAlert(true)
  const handleCloseAlert = () => setShowAlert(false)
  const [loading, setLoading] = useState(false)
  const [loadingImagen, setLoadingImagen] = useState(false)

  const [alertVariant, setAlertVariant] = useState('danger')
  const alertDanger = () => setAlertVariant('danger')
  const alertSuccess = () => setAlertVariant('success')
  const [alertMessage, setAlertMessage] = useState(
    'Ha ocurrido un error, por favor intente más tarde'
  )
  const [alertHeader, setAlertHeader] = useState('Error')

  //#region UseEffect
  useEffect(() => {
    if (producto) {
      setProductoData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        imagen: producto.imagen,
        marcasId: producto.marcas.id,
        tipoProductoId: selectedCategoria,
        adminsId: 1,
      })
    }
  }, [producto])
  //#endregion

  //#region Handle guardar cambios (CREAR O EDITAR)
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
      console.log(producto)
      const id = producto.id

      const response = await updateProducto(id, formDataForAPI)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al querer actualizar el producto')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Producto actualizado')
        setAlertMessage('El producto ha sido actualizada con éxito')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
      }
      onProductoUpdated()
    } else {
      console.log(dataToSend)
      const response = await createProducto(formDataForAPI)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al crear un producto nuevo')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Producto creado')
        setAlertMessage('El producto ha sido creado con éxito')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
      }
      onProductoUpdated()
    }
  }
  //#endregion

  //#region Handle de todos los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductoData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  //#endregion

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
    } catch (e) {
      console.log('Error al editar una imagen', response)
    }
    setLoadingImagen(false)
    onProductoUpdated()
    closePopUp()
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="border-0 bg-primario text-white" closeButton>
        <Modal.Title>
          {producto ? 'Editar producto' : 'Añadir producto'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre del producto:</Form.Label>
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
            <Form.Label>Tipo de producto:</Form.Label>
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
                      src={`${baseUrl}${producto.rutaImagen}`}
                    />
                  </Ratio>
                </Col>
                <Col
                  xs={7}
                  className="d-flex align-items-start flex-column justify-content-center border border-start-0"
                  style={{ borderRadius: '0 8px 8px 0' }}
                >
                  <p className="mb-2">Imágen de portada:</p>
                  <label htmlFor="fileInput">
                    <Button as="span">
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
                <Form.Label>Imágen de portada:</Form.Label>
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
        {loading ? (
          <Spinner className="my-3 d-block mx-auto" animation="border" />
        ) : (
          ''
        )}
        <Alert
          variant={alertVariant}
          className="mt-3 mb-0"
          onClose={handleCloseAlert}
          show={showAlert}
          dismissible
        >
          <Alert.Heading className="fs-6">
            <strong>{alertHeader}</strong>
          </Alert.Heading>
          {alertMessage}
        </Alert>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Button>
        {producto ? (
          <Button onClick={handleGuardar}>Guardar cambios</Button>
        ) : (
          <Button onClick={handleGuardar}>Crear Producto</Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ProductosCRUD_popup
