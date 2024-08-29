import { useState, useEffect } from 'react'
import { Col, Spinner, Row } from 'react-bootstrap'

import {
  getAllMarcas,
  deleteMarca,
} from '../../../../Functions/MarcasFunctions'

import MarcasPopUp from './MarcasCRUD_popup'

import { PiXCircleDuotone } from 'react-icons/pi'
import { PopUp, Boton } from '../../../../ui'

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

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await deleteMarca(selectedMarca.id)
      console.log('Marca eliminada', response)
      fetchData()
    } catch (e) {
      alert('Hubo un problema al eliminar una marca.')
      console.error(e.message)
    } finally {
      setLoading(false)
      setPopUpBorrar(false)
    }
  }

  return (
    <>
      <Col xs={12} md={10} lg={8}>
        <div className="mb-2 border-bottom pb-2">
          <Boton className="me-2" onClick={() => openPopup(null)}>
            Crear marca
          </Boton>
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
      {popUpBorrar && (
        <PopUp
          header={
            <>
              <PiXCircleDuotone className="me-2 text-danger" />
              Borrar marca
            </>
          }
          closePopUp={() => setPopUpBorrar(false)}
          buttonLabel="Borrar"
          onAction={handleDelete}
          loading={loading}
        >
          <p>
            ¿Está seguro que desea borrar la marca{' '}
            <strong>{selectedMarca.nombre}</strong>?
          </p>
        </PopUp>
      )}
    </>
  )
}

export default MarcasCRUD
