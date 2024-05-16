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
        <Button variant="secondary" onClick={() => openPopup(null)}>
          Crear medida
        </Button>
        <div className="mt-3">
          <h3 className="text-white mb-3 border-bottom pb-1">
            Medidas creadas
          </h3>
          {tallas
            .sort((a, b) => (a.nombre > b.nombre ? 1 : -1))
            .map((talla) => (
              <div
                key={talla.id}
                className="bg-white py-2 px-3 d-inline-flex me-2 mb-2 rounded align-items-center"
              >
                <p className="mb-0 me-2">
                  <strong>{talla.nombre ? talla.nombre : 'Medida'}</strong>:{' '}
                  {talla.dimensiones ? (
                    talla.dimensiones
                  ) : (
                    <em>(Sin medida)</em>
                  )}
                </p>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(talla)}
                >
                  <span className="material-symbols-outlined lh-sm text-white">
                    edit
                  </span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => openPopUpBorrar(talla)}
                >
                  <span className="material-symbols-outlined lh-sm">
                    delete
                  </span>
                </Button>
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
