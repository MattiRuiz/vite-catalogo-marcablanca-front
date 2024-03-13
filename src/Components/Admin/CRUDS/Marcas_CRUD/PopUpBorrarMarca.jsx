import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteMarca } from '../../../../Functions/MarcasFunctions'

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
      <Modal.Header className="bg-danger text-white border-0" closeButton>
        <Modal.Title>Borrar marca</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar la marca <strong>{marca.nombre}</strong>
          ?
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => handleDelete(marca.id)}>
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
