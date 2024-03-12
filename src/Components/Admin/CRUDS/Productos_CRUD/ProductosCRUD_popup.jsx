import { useState, useEffect } from 'react'
import { Button, Form, Modal, Alert, Spinner } from 'react-bootstrap'
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

  const [showAlert, setShowAlert] = useState(false)
  const handleShowAlert = () => setShowAlert(true)
  const handleCloseAlert = () => setShowAlert(false)
  const [loading, setLoading] = useState(false)

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
        onProductoUpdated()
      }
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
        onProductoUpdated()
      }
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

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {producto ? <h4>Editar producto</h4> : <h4>Añadir producto</h4>}
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
            <Form.Label>Imágen:</Form.Label>
            <Form.Control
              className="mb-3"
              type="file"
              name="imagen"
              onChange={(e) =>
                setProductoData({ ...productoData, imagen: e.target.files[0] })
              }
            />
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
      <Modal.Footer>
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
