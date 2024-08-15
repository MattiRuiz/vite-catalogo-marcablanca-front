import { useState, useEffect } from 'react'
import { Col, Button, Spinner } from 'react-bootstrap'

import { getAllMarcas } from '../../../../Functions/MarcasFunctions'

import MarcasPopUp from './MarcasCRUD_popup'
import PopUpBorrarMarca from './PopUpBorrarMarca'

import { PiTrashBold, PiNotePencilBold } from 'react-icons/pi'

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
        <div className="mb-2 border-bottom pb-2">
          <Button
            className="me-2 bg-gradient border-0"
            onClick={() => openPopup(null)}
          >
            Crear marca
          </Button>
        </div>
        <div className="mt-3">
          {marcas
            .sort((a, b) => (a.nombre > b.nombre ? 1 : -1))
            .map((marca) => (
              <div
                eventKey={marca.id}
                key={marca.id}
                className="bg-white py-2 px-3 d-inline-flex me-2 mb-2 rounded align-items-center"
              >
                <p className="d-inline me-2 mb-0 fw-bold">{marca.nombre}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(marca)}
                >
                  <PiNotePencilBold />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => openPopUpBorrar(marca)}
                >
                  <PiTrashBold />
                </Button>
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
