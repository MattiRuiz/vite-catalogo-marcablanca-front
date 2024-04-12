import { useState, useEffect } from 'react'
import { Button, Form, Modal, Alert, Spinner } from 'react-bootstrap'

import { getAllMarcas } from '../../../Functions/MarcasFunctions'
import { getAllTipoProductos } from '../../../Functions/TipoProductosFunctions'

const PopUpEditPrecio = ({ closePopUp }) => {
  const [porcentaje, setPorcentaje] = useState('')
  const [marcas, setMarcas] = useState({})
  const [tipoProducto, setTipoProducto] = useState({})

  const fetchData = async () => {
    try {
      const marcasResponse = await getAllMarcas()
      setMarcas(marcasResponse)
      const tipoProductoResponse = await getAllTipoProductos()
      setTipoProducto(tipoProductoResponse)
      console.log(marcasResponse, tipoProductoResponse)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
            <Form.Label>Seleccione una marca:</Form.Label>
            <Form.Select className="mb-3" />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default PopUpEditPrecio
