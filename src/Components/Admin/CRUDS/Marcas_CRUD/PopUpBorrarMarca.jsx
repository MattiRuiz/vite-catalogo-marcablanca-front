import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteMarca } from '../../../../Functions/MarcasFunctions'

import { PiXCircleDuotone } from 'react-icons/pi'

const PopUpBorrarMarca = ({ marca, onMarcaUpdated, closePopUp }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async (idMarca) => {
    setLoading(true)
    try {
      const response = await deleteMarca(idMarca)
      console.log('Marca eliminada', response)
    } catch (e) {
      alert('Hubo un problema al eliminar una marca.')
      return e.message
    }
    onMarcaUpdated()
    setLoading(false)
    closePopUp()
  }
  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="pb-2 bg-secondary-subtle border-0" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          <PiXCircleDuotone className="me-2 text-danger" />
          Borrar marca
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar la marca <strong>{marca.nombre}</strong>
          ?
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="secondary"
          className="border-0 bg-gradient"
          onClick={() => closePopUp()}
        >
          Cancelar
        </Button>
        <Button
          variant="danger"
          className="border-0 bg-gradient"
          onClick={() => handleDelete(marca.id)}
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            'Borrar'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PopUpBorrarMarca
