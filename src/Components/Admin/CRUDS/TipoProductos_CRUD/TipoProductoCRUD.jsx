import { useState, useEffect } from 'react'
import { Col, Image, Spinner, Ratio } from 'react-bootstrap'

import {
  getAllTipoProductos,
  deleteTipoProducto,
} from '../../../../Functions/TipoProductosFunctions'

import TipoProductosPopUp from './TipoProductoCRUD_popup'

import { PiXCircleDuotone } from 'react-icons/pi'
import { PopUp, Boton } from '../../../../ui'

const TipoProductoCRUD = () => {
  //#region Declaracion useState's
  const [tipoProductos, setTipoProductos] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [selectedTipoProducto, setSelectedTipoProducto] = useState(null)
  //#endregion

  const [imagenErrors, setImagenErrors] = useState({})
  const handleImageError = (productId) => {
    setImagenErrors((prevErrors) => ({
      ...prevErrors,
      [productId]: true,
    }))
  }

  const [loading, setLoading] = useState(false)

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    setLoading(true)
    try {
      const tallasRespone = await getAllTipoProductos()
      setTipoProductos(tallasRespone.data)
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

  const openPopup = (tipoProducto) => {
    setSelectedTipoProducto(tipoProducto)
    setPopUp(true)
  }
  //#endregion

  const openPopUpBorrar = (tipoProducto) => {
    setSelectedTipoProducto(tipoProducto)
    setPopUpBorrar(true)
  }

  //#region Handle elminar cliente
  const handleDelete = async () => {
    try {
      const response = await deleteTipoProducto(selectedTipoProducto.id)
      console.log('Tipo producto eliminado', response)
      fetchData()
    } catch (e) {
      console.error(e.message)
    } finally {
      setLoading(false)
      setPopUpBorrar(false)
    }
  }
  //#endregion

  return (
    <>
      <Col xs={12}>
        <div className="mb-2 border-bottom pb-2">
          <Boton className="me-2" onClick={() => openPopup(null)}>
            Crear tipo de producto
          </Boton>
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
                  // Mostrar elemento alternativo en caso de error
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
          <TipoProductosPopUp
            tipoProducto={selectedTipoProducto}
            onTipoProductoUpdated={() => fetchData()}
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
              Borrar tipo de producto
            </>
          }
          closePopUp={() => setPopUpBorrar(false)}
          buttonLabel="Borrar"
          onAction={handleDelete}
          loading={loading}
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
