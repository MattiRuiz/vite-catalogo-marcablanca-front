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
        <div className="mt-3 bg-white rounded">
          {tallas.map((talla) => (
            <div
              key={talla.id}
              className="px-3 d-flex justify-content-between align-items-center px-3 py-2 border-bottom"
            >
              <p className="mb-0">
                <strong>{talla.nombre ? talla.nombre : 'Medida'}</strong>:{' '}
                {talla.dimensiones ? talla.dimensiones : <em>(Sin medida)</em>}
              </p>
              <div>
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
              </div>
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
