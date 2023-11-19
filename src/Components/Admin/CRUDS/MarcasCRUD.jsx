import { useState, useEffect } from 'react'
import { getAllMarcas, deleteMarca } from '../../../Functions/MarcasFunctions'
import MarcasPopUp from './MarcasCRUD_popup'
import { Col, Button, Accordion } from 'react-bootstrap'

const MarcasCRUD = () => {
  //#region Declaracion useState's
  const [marcas, setMarcas] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [selectedMarca, setSelectedMarca] = useState(null)
  //#endregion

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    try {
      const marcasRespone = await getAllMarcas()
      setMarcas(marcasRespone.data)
    } catch (e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  //#endregion

  const openPopup = (marca) => {
    setSelectedMarca(marca)
    setPopUp(true)
  }
  //#endregion

  //#region Handle elminar cliente
  const handleDelete = async (idMarca) => {
    try {
      const response = await deleteMarca(idMarca)
      console.log('Usuario eliminado', response)
      setPopUp(false)
    } catch (e) {
      return e.message
    }
    fetchData()
  }
  //#endregion

  return (
    <>
      <Col xs={12}>
        <Button
          variant="outline-light"
          className="mt-3"
          onClick={() => openPopup(null)}
        >
          Crear Marca
        </Button>
        <Accordion className="mt-3">
          {marcas.map((marca) => (
            <Accordion.Item eventKey={marca.id} key={marca.id}>
              <Accordion.Header>{marca.nombre}</Accordion.Header>
              <Accordion.Body>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(marca)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(marca.id)}
                >
                  Borrar
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Col>
      {
        //#region Renderizado condicional PopUp
        popUp ? (
          <MarcasPopUp
            marca={selectedMarca}
            onClienteUpdated={() => fetchData()}
            closePopUp={() => setPopUp(false)}
          />
        ) : (
          <></>
        )
        //#endregion
      }
    </>
  )
}

export default MarcasCRUD
