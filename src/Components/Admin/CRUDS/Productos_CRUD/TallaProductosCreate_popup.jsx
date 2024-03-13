import { useState, useEffect } from 'react'
import { Button, Form, Modal, Alert, Spinner } from 'react-bootstrap'
import { createTallaProducto } from '../../../../Functions/TallasProductosFunctions'
import { getAllTallas } from '../../../../Functions/TallasFunctions'

const TallaProductoCreate_popup = ({
  producto,
  onProductoUpdated,
  closePopUp,
}) => {
  const [precio, setPrecio] = useState()
  const [talla, setTalla] = useState()
  const [stock, setStock] = useState(0)
  const [tallas, setTallas] = useState({})

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

  const handleStock = (e) => {
    if (e.target.checked) {
      setStock(1)
    } else {
      setStock(0)
    }
  }

  useEffect(() => {
    const getTallas = async () => {
      try {
        const response = await getAllTallas()
        setTallas(response.data)
      } catch (e) {
        console.log('Error al traer las tallas', e)
      }
    }
    getTallas()
  }, [])

  const createMedidaProducto = async () => {
    setLoading(true)
    const newMedidaProducto = {
      precio: precio,
      tallas_id: talla,
      productos_id: producto,
      stock: stock,
    }

    try {
      const response = await createTallaProducto(newMedidaProducto)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al crear una medida')
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } else {
        alertSuccess()
        setAlertHeader('Medida producto creada')
        setAlertMessage('La medida ha sido creada con éxito')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
      }
    } catch (e) {
      console.log('Error al crear una talla producto', e)
    }
    onProductoUpdated()
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header closeButton>
        <Modal.Title>Añadir medida al producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Medida:</Form.Label>
            <Form.Select
              className="mb-3"
              value={talla}
              onChange={(e) => setTalla(e.target.value)}
            >
              <option value="">Selecciona una medida</option>
              {tallas.length > 0 ? (
                tallas.map((medida) => (
                  <option key={medida.id} value={medida.id}>
                    {medida.nombre} - {medida.dimensiones}
                  </option>
                ))
              ) : (
                <></>
              )}
            </Form.Select>
            <Form.Label>Precio:</Form.Label>
            <Form.Control
              type="number"
              className="mb-3"
              placeholder="precio"
              name="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="¿Hay stock?"
            className="mb-2 mt-1"
            value={stock}
            onChange={handleStock}
          />
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
        <Button onClick={createMedidaProducto}>Crear medida</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TallaProductoCreate_popup
