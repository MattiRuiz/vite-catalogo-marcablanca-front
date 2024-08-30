import { useState, useEffect } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { createMarca, updateMarca } from '../../../../Functions/MarcasFunctions'

import { PiGearSixDuotone, PiPlusCircleDuotone } from 'react-icons/pi'

const MarcasCRUD_popup = ({ marca, onMarcaUpdated, closePopUp, showToast }) => {
  const [marcaData, setMarcaData] = useState({
    nombre: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (marca) {
      setMarcaData({
        nombre: marca.nombre || '',
      })
    }
  }, [marca])

  const handleGuardar = async () => {
    setLoading(true)

    const dataToSend = {
      ...marcaData,
    }

    if (!dataToSend.nombre) {
      showToast(
        'danger',
        'Error',
        'Hay campos vacíos, por favor complete todos los datos para continuar.'
      )
      setLoading(false)
    } else if (marca) {
      const id = marca.id
      const response = await updateMarca(id, dataToSend)
      setLoading(false)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al querer actualizar la marca.'
        )
      } else {
        showToast(
          'success',
          'Marca actualizada',
          'La marca ha sido actualizada con éxito.'
        )
        onMarcaUpdated()
        closePopUp()
      }
    } else {
      const response = await createMarca(dataToSend)
      setLoading(false)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al crear una marca nueva.'
        )
      } else {
        showToast(
          'success',
          'Marca creada',
          'La marca ha sido creada con éxito.'
        )
        onMarcaUpdated()
        closePopUp()
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setMarcaData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="pb-2 border-0 bg-secondary-subtle" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          {marca ? (
            <>
              <PiGearSixDuotone className="me-2" /> Editar una marca
            </>
          ) : (
            <>
              <PiPlusCircleDuotone className="me-2" /> Añadir una marca
            </>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre de la empresa:</Form.Label>
            <Form.Control
              type="text"
              className="mb-2 "
              placeholder="Nombre"
              name="nombre"
              value={marcaData.nombre}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="secondary"
          onClick={() => closePopUp()}
          className="bg-gradient border-0"
        >
          Cancelar
        </Button>
        {marca ? (
          <Button
            className="bg-gradient border-0"
            onClick={handleGuardar}
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              'Guardar cambios'
            )}
          </Button>
        ) : (
          <Button
            onClick={handleGuardar}
            disabled={loading}
            type="submit"
            className="bg-gradient border-0"
          >
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              'Crear marca'
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default MarcasCRUD_popup
