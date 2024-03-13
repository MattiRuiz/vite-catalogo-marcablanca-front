import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteTalla } from '../../../../Functions/TallasFunctions'

const PopUpBorrarTalla = ({ talla, onTallaUpdated, closePopUp }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async (idTalla) => {
    setLoading(true)
    try {
      const response = await deleteTalla(idTalla)
      console.log('Medida eliminada', response)
    } catch (e) {
      alert('Hubo un problema al eliminar la medida')
      return e.message
    }
    onTallaUpdated()
    setLoading(false)
    closePopUp()
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="bg-danger text-white border-0" closeButton>
        <Modal.Title>Borrar medida</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar la medida{' '}
          <strong>{talla.nombre}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => closePopUp()}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => handleDelete(talla.id)}>
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

export default PopUpBorrarTalla
