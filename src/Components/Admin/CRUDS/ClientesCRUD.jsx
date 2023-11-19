import { useState, useEffect } from 'react'
import {
  getAllClientes,
  deleteCliente,
} from '../../../Functions/ClienteFunctions'
import ClientesPopup from './ClientesCRUD_popup'
import { Col, Button } from 'react-bootstrap'

const ClientesCRUD = () => {
  //#region Declaracion useState's
  const [clientes, setClientes] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null)
  //#endregion

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    try {
      const clientesResponse = await getAllClientes()
      setClientes(clientesResponse.data)
    } catch (e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  //#endregion

  const openPopup = (cliente) => {
    setSelectedCliente(cliente)
    setPopUp(true)
  }
  //#endregion

  //#region Handle elminar cliente
  const handleDelete = async (idCliente) => {
    try {
      const response = await deleteCliente(idCliente)
      console.log('Usuario eliminado', response)
      setPopUp(false)
    } catch (e) {
      return e.message
    }
    fetchData()
  }
  //#endregion

  return (
    <div>
      <Col xs={5}>
        <Button
          variant="outline-light"
          className="mt-3"
          onClick={() => openPopup(null)}
        >
          Crear cliente
        </Button>
        <ul className="list-group mt-3">
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
              className="list-group-item d-flex justify-content-between"
            >
              {cliente.clientes.nombre} {cliente.clientes.apellido}
              <br></br>
              {cliente.username}
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(cliente)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(cliente.id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Col>
      {
        //#region Renderizado condicional PopUp
        popUp ? (
          <ClientesPopup
            cliente={selectedCliente}
            onClienteUpdated={() => fetchData()}
            closePopUp={() => setPopUp(false)}
          />
        ) : (
          <></>
        )
        //#endregion
      }
    </div>
  )
}

export default ClientesCRUD
