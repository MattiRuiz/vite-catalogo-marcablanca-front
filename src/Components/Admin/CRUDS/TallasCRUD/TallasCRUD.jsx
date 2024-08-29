import { useState, useEffect } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'

import {
  getAllTallas,
  deleteTalla,
} from '../../../../Functions/TallasFunctions'

import TallasPopUp from './TallasCRUD_popup'

import { PiXCircleDuotone } from 'react-icons/pi'
import { PopUp, Boton } from '../../../../ui'

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

  useEffect(() => {
    fetchData()
  }, [])
  //#endregion

  const openPopUpBorrar = (talla) => {
    setSelectedTalla(talla)
    setPopUpBorrar(true)
  }

  const openPopup = (marca) => {
    setSelectedTalla(marca)
    setPopUp(true)
  }
  //#endregion

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await deleteTalla(selectedTalla.id)
      console.log('Medida eliminada', response)
      fetchData()
    } catch (e) {
      alert('Hubo un problema al eliminar la medida')
      console.error(e.message)
    } finally {
      setLoading(false)
      setPopUpBorrar(false)
    }
  }

  return (
    <>
      <Col xs={12}>
        <div className="mb-2 border-bottom pb-2">
          <Boton onClick={() => openPopup(null)}>Crear medida</Boton>
        </div>
        <Row className="d-flex align-items-center justify-content-between p-2 bg-dark mt-3 rounded-top text-white">
          <Col>
            <p className="mb-0 texto-14 fw-bold">Nombre de la medida</p>
          </Col>
          <Col>
            <p className="mb-0 texto-14 fw-bold">Descripción</p>
          </Col>
          <Col xs={2}>
            <p className="mb-0 texto-14 fw-bold text-center">Opciones</p>
          </Col>
        </Row>
        <Row>
          {tallas
            .sort((a, b) => (a.nombre > b.nombre ? 1 : -1))
            .map((talla) => (
              <div
                key={talla.id}
                className="border-bottom d-flex align-items-center justify-content-between p-2 bg-white"
              >
                <Col>{talla.nombre ? talla.nombre : <em>(Sin nombre)</em>}</Col>
                <Col>
                  {talla.dimensiones ? (
                    talla.dimensiones
                  ) : (
                    <em>(Sin medida)</em>
                  )}
                </Col>
                <Col xs={2} className="d-flex justify-content-center">
                  <button
                    className="texto-14 fw-semibold py-0 border-end bg-transparent"
                    onClick={() => openPopup(talla)}
                  >
                    Editar
                  </button>
                  <button
                    className="texto-14 fw-semibold py-0 bg-transparent"
                    onClick={() => openPopUpBorrar(talla)}
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
      {popUpBorrar && (
        <PopUp
          header={
            <>
              <PiXCircleDuotone className="me-2 text-danger" />
              Borrar medida
            </>
          }
          closePopUp={() => setPopUpBorrar(false)}
          buttonLabel="Borrar"
          onAction={handleDelete}
          loading={loading}
        >
          <p className="mb-2">¿Está seguro que desea borrar esta medida?</p>
          <p className="mb-2 ms-1">
            <strong>
              {selectedTalla.nombre ? (
                selectedTalla.nombre
              ) : (
                <em>(Sin nombre)</em>
              )}{' '}
            </strong>
            -{' '}
            {selectedTalla.dimensiones ? (
              selectedTalla.dimensiones
            ) : (
              <em>(Sin medida)</em>
            )}
          </p>
        </PopUp>
      )}
    </>
  )
}

export default TallasCRUD
