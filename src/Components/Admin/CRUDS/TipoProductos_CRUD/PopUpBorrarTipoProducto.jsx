import { useState } from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { deleteTipoProducto } from '../../../../Functions/TipoProductosFunctions'

import { PiXCircleDuotone } from 'react-icons/pi'

const PopUpBorrarTipoProducto = ({
  tipoProducto,
  onTipoProductoUpdated,
  closePopUp,
}) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async (idTipoProducto) => {
    setLoading(true)
    try {
      const response = await deleteTipoProducto(idTipoProducto)
      console.log('Tipo producto eliminado', response)
    } catch (e) {
      alert('Hubo un problema al eliminar el tipo de producto.')
      return e.message
    }
    onTipoProductoUpdated()
    setLoading(false)
    closePopUp()
  }

  return (
    <Modal show={true} onHide={closePopUp} centered>
      <Modal.Header className="pb-2 bg-secondary-subtle border-0" closeButton>
        <Modal.Title className="fw-bold d-flex align-items-center">
          <PiXCircleDuotone className="me-2 text-danger" />
          Borrar tipo de producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro que desea borrar el tipo de producto{' '}
          <strong>{tipoProducto.nombre}</strong>?
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
          onClick={() => handleDelete(tipoProducto.id)}
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

export default PopUpBorrarTipoProducto
