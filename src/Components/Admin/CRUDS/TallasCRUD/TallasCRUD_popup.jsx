import { useState, useEffect } from 'react'
import { Form, Modal, Spinner } from 'react-bootstrap'

import { createTalla, updateTalla } from '../../../../Functions/TallasFunctions'

import { PiGearSixDuotone, PiPlusCircleDuotone } from 'react-icons/pi'

import { Boton } from '../../../../ui'

const TallasCRUD_popup = ({ talla, onTallaUpdated, closePopUp, showToast }) => {
  const [tallaData, setTallaData] = useState({
    nombre: '',
    dimensiones: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (talla) {
      setTallaData({
        nombre: talla.nombre || '',
        dimensiones: talla.dimensiones || '',
      })
    }
  }, [talla])

  const handleGuardar = async () => {
    setLoading(true)
    const dataToSend = {
      ...tallaData,
    }

    if (!dataToSend.nombre && !dataToSend.dimensiones) {
      showToast('danger', 'Error', 'Ambos campos no pueden encontrarse vacíos.')
      setLoading(false)
    } else if (talla) {
      const id = talla.id
      const response = await updateTalla(id, dataToSend)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al actualizar la medida.'
        )
      } else {
        showToast(
          'success',
          'Medida actualizada',
          'La medida ha sido actualizada con éxito.'
        )
        onTallaUpdated()
        closePopUp()
      }
      setLoading(false)
    } else {
      const response = await createTalla(dataToSend)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al crear una medida nueva'
        )
      } else {
        showToast(
          'success',
          'Medida creada',
          'La medida ha sido creada con éxito'
        )
        onTallaUpdated()
        closePopUp()
      }
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTallaData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="pb-2 border-0 bg-secondary-subtle" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          {talla ? (
            <>
              <PiGearSixDuotone className="me-2" /> Editar una medida
            </>
          ) : (
            <>
              <PiPlusCircleDuotone className="me-2" /> Añadir una medida
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              Nombre de la medida <span className="text-danger">*</span>:
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Nombre"
              name="nombre"
              value={tallaData.nombre}
              onChange={handleInputChange}
            />
            <Form.Label>
              Dimensiones <span className="text-danger">*</span>:
            </Form.Label>
            <Form.Control
              type="text"
              className="mb-1"
              placeholder="Dimensiones"
              name="dimensiones"
              value={tallaData.dimensiones}
              onChange={handleInputChange}
            />
          </Form.Group>
          <p className="texto-14">
            <em>
              <span className="text-danger">*</span> Uno de los valores puede
              encontrarse en vacío pero no ambos.
            </em>
          </p>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Boton variant="secondary" onClick={() => closePopUp()}>
          Cancel
        </Boton>
        {talla ? (
          <Boton onClick={handleGuardar} disabled={loading}>
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              'Guardar cambios'
            )}
          </Boton>
        ) : (
          <Boton onClick={handleGuardar} disabled={loading} type="submit">
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              'Crear medida'
            )}
          </Boton>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default TallasCRUD_popup
