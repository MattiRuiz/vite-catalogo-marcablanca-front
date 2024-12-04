import { useState, useEffect } from 'react'
import { Col, Image, Spinner, Ratio } from 'react-bootstrap'

import {
  getAdminTipoProductos,
  deleteTipoProducto,
} from '../../../Functions/TipoProductosFunctions'

import TipoProductosPopUp from './TipoProductoCRUD_popup'

import { PopUp, BotonSecundario } from '../../../ui'

import { PiPlusCircleBold } from 'react-icons/pi'

const TipoProductoCRUD = ({ showToast }) => {
  const [tipoProductos, setTipoProductos] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedTipoProducto, setSelectedTipoProducto] = useState(null)
  const [imagenErrors, setImagenErrors] = useState({})

  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const tallasRespone = await getAdminTipoProductos()
      setTipoProductos(tallasRespone.data)
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

  const openPopup = (tipoProducto) => {
    setSelectedTipoProducto(tipoProducto)
    setPopUp(true)
  }

  const openPopUpBorrar = (tipoProducto) => {
    setSelectedTipoProducto(tipoProducto)
    setPopUpBorrar(true)
  }

  const handleDelete = async () => {
    try {
      await deleteTipoProducto(selectedTipoProducto.id)
      showToast(
        'success',
        'Categoría eliminada',
        'La categoría se ha eliminado con éxito.'
      )
      fetchData()
      setPopUpBorrar(false)
    } catch (e) {
      showToast(
        'danger',
        'Error',
        'Hubo un problema al eliminar una categoría.'
      )
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Col xs={12}>
        <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
          <h2 className="mb-0 fw-bold">Categorías</h2>
          <BotonSecundario onClick={() => openPopup(null)}>
            Añadir <PiPlusCircleBold className="ms-2" />
          </BotonSecundario>
        </div>
        <div className="mt-3">
          {tipoProductos.map((tipoProducto) => (
            <div
              key={tipoProducto.id}
              className="bg-white me-2 mb-2 rounded d-inline-flex flex-column align-items-center"
            >
              <Ratio
                aspectRatio="1x1"
                className="tipoproducto-preview rounded-top"
              >
                {imagenErrors[tipoProducto.id] ? (
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center border rounded-3toptext-center">
                    <p className="texto-14 mb-0 color-grisclaro">
                      <strong>Sin imágen</strong>
                    </p>
                  </div>
                ) : (
                  <Image
                    fluid
                    className="object-fit-cover rounded-top mx-auto"
                    src={tipoProducto.rutaImagen}
                    onError={() => handleImageError(tipoProducto.id)}
                  />
                )}
              </Ratio>
              <p className="fw-semibold my-1">{tipoProducto.nombre}</p>
              <div className="border-top">
                <button
                  className="bg-transparent texto-14 border-end"
                  onClick={() => openPopup(tipoProducto)}
                >
                  Editar
                </button>
                <button
                  className="bg-transparent texto-14"
                  onClick={() => openPopUpBorrar(tipoProducto)}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <Spinner
            variant="dark"
            className="my-5 d-block mx-auto"
            animation="border"
          />
        )}
      </Col>
      {popUp && (
        <TipoProductosPopUp
          tipoProducto={selectedTipoProducto}
          onTipoProductoUpdated={() => fetchData()}
          closePopUp={() => setPopUp(false)}
          showToast={showToast}
        />
      )}
      {popUpBorrar && (
        <PopUp
          header="Borrar tipo de producto"
          closePopUp={() => setPopUpBorrar(false)}
          buttonLabel="Borrar"
          onAction={handleDelete}
          loading={loading}
          variant="danger"
        >
          <p>
            ¿Está seguro que desea borrar el tipo de producto{' '}
            <strong>{selectedTipoProducto.nombre}</strong>?
          </p>
        </PopUp>
      )}
    </>
  )
}

export default TipoProductoCRUD
