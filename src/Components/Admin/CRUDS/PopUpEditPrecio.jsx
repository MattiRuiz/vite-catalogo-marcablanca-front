import { useState, useEffect } from 'react'
import { Form, Modal, Alert, Spinner } from 'react-bootstrap'

import { getAllMarcas } from '../../../Functions/MarcasFunctions'
import { getAllTipoProductos } from '../../../Functions/TipoProductosFunctions'
import { editPrecioEnGrupo } from '../../../Functions/ProductosFunctions'

import { Boton } from '../../../ui'

const PopUpEditPrecio = ({ closePopUp }) => {
  const [porcentaje, setPorcentaje] = useState('')
  const [marcas, setMarcas] = useState()
  const [tipoProductos, setTipoProductos] = useState()

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

  const [selectedMarca, setSelectedMarca] = useState()
  const [selectedTipoProducto, setSelectedTipoProducto] = useState()

  const fetchData = async () => {
    try {
      const marcasResponse = await getAllMarcas()
      setMarcas(marcasResponse.data)
      const tipoProductoResponse = await getAllTipoProductos()
      setTipoProductos(tipoProductoResponse.data)
    } catch (e) {
      console.log(e.message)
      alertDanger()
      setAlertHeader('Error')
      setAlertMessage(
        'Hubo un problema al querer cargar las opciones de marca y tipo producto, por favor intente más tarde.'
      )
      handleShowAlert()
      setTimeout(() => handleCloseAlert(), 3000)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleGuardar = async () => {
    setLoading(true)
    if (!porcentaje || !selectedMarca || !selectedTipoProducto) {
      setLoading(false)
      alertDanger()
      setAlertHeader('Error')
      setAlertMessage(
        'Hay campos vacios, por favor complete el formulario para realizar el cambio.'
      )
    } else {
      try {
        const aumento = (Number(porcentaje) + 100) / 100
        const dataToSend = {
          aumento,
          marcaId: Number(selectedMarca),
          tipoProducto_id: Number(selectedTipoProducto),
        }
        console.log('dataToSend', dataToSend)

        const response = await editPrecioEnGrupo(dataToSend)
        setLoading(false)
        if (!response) {
          alertDanger()
          setAlertHeader('Error')
          setAlertMessage('Hubo un problema al querer actualizar los precios.')
          handleShowAlert()
          setTimeout(() => handleCloseAlert(), 3000)
        } else {
          alertSuccess()
          setAlertHeader('Precios actualizados')
          setAlertMessage('Los precios han sido modificados con éxito')
          handleShowAlert()
          setTimeout(() => {
            closePopUp(), window.location.reload()
          }, 2000)
        }
      } catch (error) {
        console.log(error)
        setAlertMessage(
          'Hubo un problema al querer ejecutar la función de precios.'
        )
        handleShowAlert()
        setTimeout(() => handleCloseAlert(), 3000)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="border-0 bg-primario text-white" closeButton>
        <Modal.Title>Editar precios en grupo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Porcentaje de aumento:</Form.Label>
            <Form.Control
              type="string"
              className="mb-2"
              placeholder="Porcentaje"
              value={porcentaje}
              onChange={(e) => setPorcentaje(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Marca a aumentar:</Form.Label>
            <Form.Select
              className="mb-3"
              value={selectedMarca}
              onChange={(e) => setSelectedMarca(e.target.value)}
            >
              <option value="">Seleccione una marca</option>
              {marcas &&
                marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo de producto a aumentar:</Form.Label>
            <Form.Select
              className="mb-3"
              value={selectedTipoProducto}
              onChange={(e) => setSelectedTipoProducto(e.target.value)}
            >
              <option value="">Seleccione un tipo de producto</option>
              {tipoProductos &&
                tipoProductos.map((tipoProducto) => (
                  <option key={tipoProducto.id} value={tipoProducto.id}>
                    {tipoProducto.nombre}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
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
      <Modal.Footer>
        <Boton variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Boton>
        <Boton onClick={handleGuardar} disabled={loading}>
          {loading ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            'Enviar'
          )}
        </Boton>
      </Modal.Footer>
    </Modal>
  )
}

export default PopUpEditPrecio
