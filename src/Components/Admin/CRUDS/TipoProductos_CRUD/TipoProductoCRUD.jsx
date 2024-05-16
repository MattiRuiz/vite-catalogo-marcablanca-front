import { useState, useEffect } from 'react'
import { Col, Button, Accordion, Image, Spinner, Ratio } from 'react-bootstrap'

import {
  getAllTipoProductos,
  deleteTipoProducto,
} from '../../../../Functions/TipoProductosFunctions'

import TipoProductosPopUp from './TipoProductoCRUD_popup'
import PopUpBorrarTipoProducto from './PopUpBorrarTipoProducto'

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
  const handleDelete = async (idTipoProducto) => {
    try {
      const response = await deleteTipoProducto(idTipoProducto)
      console.log('Tipo producto eliminado', response)
      setPopUp(false)
    } catch (e) {
      return e.message
    }
    fetchData()
  }
  //#endregion

  return (
    <>
      <Col xs={12}>
        <Button
          variant="secondary"
          className="mt-3"
          onClick={() => openPopup(null)}
        >
          Crear tipo de producto
        </Button>
        <div className="mt-3">
          {tipoProductos.map((tipoProducto) => (
            <div
              eventKey={tipoProducto.id}
              key={tipoProducto.id}
              className="bg-white py-2 px-3 me-2 mb-2 rounded d-inline-flex flex-column align-items-center"
            >
              <Ratio
                aspectRatio="1x1"
                className="tipoproducto-preview rounded-circle"
              >
                {imagenErrors[tipoProducto.id] ? (
                  // Mostrar elemento alternativo en caso de error
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center border rounded-circle text-center">
                    <p className="texto-14 mb-0 color-grisclaro">
                      <strong>Sin imágen</strong>
                    </p>
                  </div>
                ) : (
                  <Image
                    fluid
                    className="object-fit-cover rounded-circle mx-auto"
                    src={tipoProducto.rutaImagen}
                    onError={() => handleImageError(tipoProducto.id)}
                  />
                )}
              </Ratio>
              <p className="fw-semibold mb-1">{tipoProducto.nombre}</p>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(tipoProducto)}
                >
                  <span className="material-symbols-outlined lh-sm text-white">
                    edit
                  </span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => openPopUpBorrar(tipoProducto)}
                >
                  <span className="material-symbols-outlined lh-sm text-white">
                    delete
                  </span>
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
      {popUpBorrar ? (
        <PopUpBorrarTipoProducto
          tipoProducto={selectedTipoProducto}
          onTipoProductoUpdated={() => fetchData()}
          closePopUp={() => setPopUpBorrar(false)}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default TipoProductoCRUD
