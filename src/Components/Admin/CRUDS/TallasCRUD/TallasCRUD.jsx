import { useState, useEffect } from 'react'
import { Col, Button, Accordion, Spinner } from 'react-bootstrap'

import { getAllTallas } from '../../../../Functions/TallasFunctions'

import TallasPopUp from './TallasCRUD_popup'
import PopUpBorrarTalla from './PopUpBorrarTalla'

const TallasCRUD = () => {
  //#region Declaracion useState's
  const [tallas, setTallas] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [selectedTalla, setSelectedTalla] = useState(null)
  //#endregion

  const [loading, setLoading] = useState(false)

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    setLoading(true)
    try {
      const tallasRespone = await getAllTallas()
      setTallas(tallasRespone.data)
    } catch (e) {
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const openPopUpBorrar = (talla) => {
    setSelectedTalla(talla)
    setPopUpBorrar(true)
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
                  onClick={() => openPopUpBorrar(talla)}
                >
                  Borrar
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
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
      {popUpBorrar ? (
        <PopUpBorrarTalla
          talla={selectedTalla}
          onTallaUpdated={() => fetchData()}
          closePopUp={() => setPopUpBorrar(false)}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default TallasCRUD
