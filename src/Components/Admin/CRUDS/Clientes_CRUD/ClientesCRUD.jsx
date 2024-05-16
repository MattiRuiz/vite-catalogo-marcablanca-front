import { useState, useEffect } from 'react'
import { Col, Button, Accordion, Spinner, Row } from 'react-bootstrap'

import {
  getAllClientes,
  deleteCliente,
} from '../../../../Functions/ClienteFunctions'

import ClientesPopup from './ClientesCRUD_popup'
import PopUpBorrarCliente from './PopUpBorrarCliente'

const ClientesCRUD = () => {
  //#region Declaracion useState's
  const [clientes, setClientes] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null)
  //#endregion

  const [loading, setLoading] = useState(false)

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    setLoading(true)
    try {
      const clientesResponse = await getAllClientes()
      setClientes(clientesResponse.data)
    } catch (e) {
      console.error(e.message)
    } finally {
      setLoading(false)
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

  const openPopUpBorrar = (cliente) => {
    setSelectedCliente(cliente)
    setPopUpBorrar(true)
  }

  return (
    <>
      <Col xs={12}>
        <Button
          variant="secondary"
          className="mt-3"
          onClick={() => openPopup(null)}
        >
          Crear cliente
        </Button>
        <div className="d-flex align-items-center justify-content-between p-2 bg-dark mt-3 rounded-top text-white">
          <Col>
            <p className="mb-0">User</p>
          </Col>
          <Col>
            <p className="mb-0">Nombre</p>
          </Col>
          <Col xs={2}>
            <p className="mb-0">Opciones</p>
          </Col>
        </div>
        <div className="bg-white">
          {clientes.map((cliente) => (
            <div
              eventKey={cliente.id}
              key={cliente.id}
              className="border-bottom d-flex align-items-center justify-content-between p-2"
            >
              <Col>{cliente.username}</Col>
              <Col>
                {cliente.clientes.nombre} {cliente.clientes.apellido}
              </Col>
              <Col xs={2}>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(cliente)}
                >
                  <span className="material-symbols-outlined lh-sm text-white">
                    edit
                  </span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => openPopUpBorrar(cliente)}
                >
                  <span className="material-symbols-outlined lh-sm">
                    delete
                  </span>
                </Button>
              </Col>
            </div>
          ))}
        </div>
        {loading ? (
          <Spinner
            variant="light"
            className="my-5 d-block mx-auto"
            animation="border"
          />
        ) : (
          ''
        )}
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
      {popUpBorrar ? (
        <PopUpBorrarCliente
          cliente={selectedCliente}
          onClienteUpdated={() => fetchData()}
          closePopUp={() => setPopUpBorrar(false)}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default ClientesCRUD
