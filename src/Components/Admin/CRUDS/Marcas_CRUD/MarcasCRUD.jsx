import { useState, useEffect } from 'react'
import { Col, Button, Accordion, Spinner } from 'react-bootstrap'

import {
  getAllMarcas,
  deleteMarca,
} from '../../../../Functions/MarcasFunctions'

import MarcasPopUp from './MarcasCRUD_popup'
import PopUpBorrarMarca from './PopUpBorrarMarca'

const MarcasCRUD = () => {
  //#region Declaracion useState's
  const [marcas, setMarcas] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [selectedMarca, setSelectedMarca] = useState(null)
  //#endregion

  const [loading, setLoading] = useState(false)

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    setLoading(true)
    try {
      const marcasRespone = await getAllMarcas()
      setMarcas(marcasRespone.data)
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

  const openPopup = (marca) => {
    setSelectedMarca(marca)
    setPopUp(true)
  }
  //#endregion

  const openPopUpBorrar = (marca) => {
    setSelectedMarca(marca)
    setPopUpBorrar(true)
  }

  return (
    <>
      <Col xs={12}>
        <Button
          variant="outline-light"
          className="mt-3"
          onClick={() => openPopup(null)}
        >
          Crear marca
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
                  onClick={() => openPopUpBorrar(marca)}
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
          <MarcasPopUp
            marca={selectedMarca}
            onMarcaUpdated={() => fetchData()}
            closePopUp={() => setPopUp(false)}
          />
        ) : (
          <></>
        )
        //#endregion
      }
      {popUpBorrar ? (
        <PopUpBorrarMarca
          marca={selectedMarca}
          onMarcaUpdated={() => fetchData()}
          closePopUp={() => setPopUpBorrar(false)}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default MarcasCRUD
