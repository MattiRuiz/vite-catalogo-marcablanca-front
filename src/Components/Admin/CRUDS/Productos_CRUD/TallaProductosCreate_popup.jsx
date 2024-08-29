import { useState, useEffect } from 'react'
import { Form, Modal, Alert, Spinner } from 'react-bootstrap'

import {
  createTallaProducto,
  updateTallaProducto,
} from '../../../../Functions/TallasProductosFunctions'
import { getAllTallas } from '../../../../Functions/TallasFunctions'

import { PiGearSixDuotone, PiPlusCircleDuotone } from 'react-icons/pi'
import { Boton } from '../../../../ui'

const TallaProductoCreate_popup = ({
  selectedTallaProducto,
  producto,
  onProductoUpdated,
  closePopUp,
}) => {
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

  const [tallaSelected, setTallaSelected] = useState({
    stock: 0,
    precio: '',
    tallas_id: '',
    productos_id: producto.id,
  })

  useEffect(() => {
    if (selectedTallaProducto) {
      setTallaSelected({
        stock: selectedTallaProducto.stock || 0,
        precio: selectedTallaProducto.precio || '',
        tallas_id: selectedTallaProducto.tallas.id || '',
        productos_id: producto.id,
      })
    }
  }, [selectedTallaProducto])

  //#region Handle de todos los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTallaSelected((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  //#endregion

  const handleStock = (e) => {
    if (e.target.checked) {
      setTallaSelected((prevData) => ({
        ...prevData,
        stock: 1,
      }))
    } else {
      setTallaSelected((prevData) => ({
        ...prevData,
        stock: 0,
      }))
    }
  }

  const handleGuardar = async () => {
    setLoading(true)
    handleCloseAlert()

    const dataToSend = {
      ...tallaSelected,
    }

    if (!dataToSend.precio) {
      alertDanger()
      setAlertHeader('Error')
      setAlertMessage('No puedes crear un tipo de producto sin precio.')
      handleShowAlert()
      setLoading(false)
      return console.log('Error al crear un tipo de producto')
    }

    if (selectedTallaProducto) {
      const id = selectedTallaProducto.id
      const response = await updateTallaProducto(id, dataToSend)
      setLoading(false)
      if (!response) {
        alertDanger()
        setAlertHeader('Error')
        setAlertMessage('Hubo un problema al querer actualizar la información.')
        handleShowAlert()
      } else {
        alertSuccess()
        setAlertHeader('Medida actualizada')
        setAlertMessage('La medida de este producto ha sido actualizada')
        handleShowAlert()
        setTimeout(() => closePopUp(), 2000)
        onProductoUpdated()
      }
    } else {
      try {
        console.log('data', dataToSend)
        const response = await createTallaProducto(dataToSend)
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
          onProductoUpdated()
        }
      } catch (e) {
        console.log('Error al crear una talla producto', e)
      }
    }
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="pb-2 border-0 bg-secondary-subtle" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          {selectedTallaProducto ? (
            <>
              <PiGearSixDuotone className="me-2" /> Editar una medida de
              producto
            </>
          ) : (
            <>
              <PiPlusCircleDuotone className="me-2" /> Añadir una medida al
              producto
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Medida:</Form.Label>
            <Form.Select
              className="mb-3"
              name="tallas_id"
              value={tallaSelected.tallas_id}
              onChange={handleInputChange}
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
              value={tallaSelected.precio}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="¿Hay stock?"
            className="mb-2 mt-1"
            checked={tallaSelected.stock}
            onChange={handleStock}
          />
        </Form>
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
        <Boton variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Boton>
        <Boton onClick={handleGuardar} disabled={loading} type="submit">
          {loading ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            'Guardar'
          )}
        </Boton>
      </Modal.Footer>
    </Modal>
  )
}

export default TallaProductoCreate_popup
