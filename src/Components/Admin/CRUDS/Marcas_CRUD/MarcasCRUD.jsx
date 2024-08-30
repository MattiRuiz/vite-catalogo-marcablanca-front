import { useState, useEffect } from 'react'
import { Col, Spinner, Row } from 'react-bootstrap'

import {
  getAllMarcas,
  deleteMarca,
} from '../../../../Functions/MarcasFunctions'

import MarcasPopUp from './MarcasCRUD_popup'

import { PiXCircleDuotone } from 'react-icons/pi'
import { PopUp, Boton } from '../../../../ui'

const MarcasCRUD = ({ showToast }) => {
  const [marcas, setMarcas] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [selectedMarca, setSelectedMarca] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const marcasRespone = await getAllMarcas()
      setMarcas(marcasRespone.data)
    } catch (e) {
      showToast(
        'danger',
        'Problema de carga',
        'Hubo un problema al actualizar la información.'
      )
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openPopup = (marca) => {
    setSelectedMarca(marca)
    setPopUp(true)
  }

  const openPopUpBorrar = (marca) => {
    setSelectedMarca(marca)
    setPopUpBorrar(true)
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteMarca(selectedMarca.id)
      showToast(
        'success',
        'Marca eliminada',
        'La marca se ha eliminado con éxito.'
      )
      fetchData()
      setPopUpBorrar(false)
    } catch (e) {
      showToast('danger', 'Error', 'Hubo un problema al eliminar la marca.')
      console.error(e.message)
    } finally {
      setLoading(false)
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
        {loading && (
          <Spinner
            variant="dark"
            className="my-5 d-block mx-auto"
            animation="border"
          />
        )}
      </Col>
      {popUp && (
        <MarcasPopUp
          marca={selectedMarca}
          onMarcaUpdated={() => fetchData()}
          closePopUp={() => setPopUp(false)}
          showToast={showToast}
        />
      )}
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
