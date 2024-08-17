import { useState, useEffect } from 'react'
import { Col, Button, Spinner, Row } from 'react-bootstrap'

import { getAllMarcas } from '../../../../Functions/MarcasFunctions'

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
      <Col xs={12} md={10} lg={8}>
        <div className="mb-2 border-bottom pb-2">
          <Button
            className="me-2 bg-gradient border-0"
            onClick={() => openPopup(null)}
          >
            Crear marca
          </Button>
        </div>
        <Row className="d-flex align-items-center justify-content-between p-2 bg-dark mt-3 rounded-top text-white">
          <Col>
            <p className="mb-0 texto-14 fw-bold">Empresa</p>
          </Col>
          <Col xs={2}>
            <p className="mb-0 texto-14 fw-bold text-center">Opciones</p>
          </Col>
        </Row>
        <Row>
          {marcas
            .sort((a, b) => (a.nombre > b.nombre ? 1 : -1))
            .map((marca) => (
              <div
                key={marca.id}
                className="border-bottom d-flex align-items-center justify-content-between p-2 bg-white"
              >
                <Col>{marca.nombre}</Col>
                <Col xs={2} className="d-flex justify-content-center">
                  <button
                    className="texto-14 fw-semibold py-0 border-end bg-transparent"
                    onClick={() => openPopup(marca)}
                  >
                    Editar
                  </button>
                  <button
                    className="texto-14 fw-semibold py-0 bg-transparent"
                    onClick={() => openPopUpBorrar(marca)}
                  >
                    Borrar
                  </button>
                </Col>
              </div>
            ))}
        </Row>
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
