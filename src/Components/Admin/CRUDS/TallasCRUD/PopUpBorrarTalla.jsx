import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteTalla } from '../../../../Functions/TallasFunctions'

import { PiXCircleDuotone } from 'react-icons/pi'

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
      <Modal.Header className="pb-2 bg-secondary-subtle border-0" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          <PiXCircleDuotone className="me-2 text-danger" /> Borrar medida
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-2">¿Está seguro que desea borrar esta medida?</p>
        <p className="mb-2 ms-1">
          <strong>
            {talla.nombre ? talla.nombre : <em>(Sin nombre)</em>}{' '}
          </strong>
          - {talla.dimensiones ? talla.dimensiones : <em>(Sin medida)</em>}
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
          onClick={() => handleDelete(talla.id)}
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

export default PopUpBorrarTalla
