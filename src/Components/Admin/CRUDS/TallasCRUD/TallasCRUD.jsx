import { useState, useEffect } from 'react'
import {
  getAllTallas,
  deleteTalla,
} from '../../../../Functions/TallasFunctions'
import TallasPopUp from './TallasCRUD_popup'
import { Col, Button, Accordion } from 'react-bootstrap'

const TallasCRUD = () => {
  //#region Declaracion useState's
  const [tallas, setTallas] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [selectedTalla, setSelectedTalla] = useState(null)
  //#endregion

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    try {
      const tallasRespone = await getAllTallas()
      setTallas(tallasRespone.data)
    } catch (e) {
      console.error(e.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  //#endregion

  const openPopup = (marca) => {
    setSelectedTalla(marca)
    setPopUp(true)
  }
  //#endregion

  //#region Handle elminar cliente
  const handleDelete = async (idTalla) => {
    try {
      const response = await deleteTalla(idTalla)
      console.log('Talla eliminado', response)
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
          Crear medida
        </Button>
        <Accordion className="mt-3">
          {tallas.map((talla) => (
            <Accordion.Item eventKey={talla.id} key={talla.id}>
              <Accordion.Header>
                <ul className="list-unstyled my-0">
                  <li className="fs-5 mb-1">{talla.nombre}</li>
                  <li>
                    <strong>Medidas: </strong>
                    {talla.dimensiones}
                  </li>
                </ul>
              </Accordion.Header>
              <Accordion.Body>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(talla)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(talla.id)}
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
          <TallasPopUp
            talla={selectedTalla}
            onTallaUpdated={() => fetchData()}
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

export default TallasCRUD
