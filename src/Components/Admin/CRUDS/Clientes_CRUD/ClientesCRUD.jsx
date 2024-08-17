import { useState, useEffect } from 'react'
import { Col, Button, Spinner } from 'react-bootstrap'

import { getAllClientes } from '../../../../Functions/ClienteFunctions'

import ClientesPopup from './ClientesCRUD_popup'
import PopUpBorrarCliente from './PopUpBorrarCliente'

import { PiTrashBold, PiNotePencilBold } from 'react-icons/pi'

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
        <div className="mb-2 border-bottom pb-2">
          <Button
            className="me-2 bg-gradient border-0"
            onClick={() => openPopup(null)}
          >
            Crear cliente
          </Button>
        </div>
        <div className="d-flex align-items-center justify-content-between p-2 bg-dark mt-3 rounded-top text-white">
          <Col>
            <p className="mb-0 texto-14 fw-bold">Usuario</p>
          </Col>
          <Col>
            <p className="mb-0 texto-14 fw-bold">Nombre y apellido</p>
          </Col>
          <Col xs={2}>
            <p className="mb-0 texto-14 fw-bold text-center">Opciones</p>
          </Col>
        </div>
        <div className="bg-white">
          {clientes.map((cliente) => (
            <div
              key={cliente.id}
              className="border-bottom d-flex align-items-center justify-content-between p-2"
            >
              <Col>{cliente.username}</Col>
              <Col>
                {cliente.clientes.nombre} {cliente.clientes.apellido}
              </Col>
              <Col xs={2} className="d-flex justify-content-center">
                <button
                  className="texto-14 fw-semibold py-0 border-end bg-transparent"
                  onClick={() => openPopup(cliente)}
                >
                  Editar
                </button>
                <button
                  className="texto-14 fw-semibold py-0 bg-transparent"
                  onClick={() => openPopUpBorrar(cliente)}
                >
                  Borrar
                </button>
              </Col>
            </div>
          ))}
        </div>
        {loading ? (
          <Spinner
            variant="dark"
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
