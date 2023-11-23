import { useState, useEffect } from 'react'
import {
  getAllTipoProductos,
  deleteTipoProducto,
} from '../../../../Functions/TipoProductosFunctions'
import TipoProductosPopUp from './TipoProductoCRUD_popup'
import { Col, Button, Accordion, Image, Row } from 'react-bootstrap'

const TipoProductoCRUD = () => {
  //#region Declaracion useState's
  const [tipoProductos, setTipoProductos] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [selectedTipoProducto, setSelectedTipoProducto] = useState(null)
  //#endregion

  //#region Data inicial useEffect(clientes)
  const fetchData = async () => {
    try {
      const tallasRespone = await getAllTipoProductos()
      setTipoProductos(tallasRespone.data)
    } catch (e) {
      console.error(e.message)
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
          variant="outline-light"
          className="mt-3"
          onClick={() => openPopup(null)}
        >
          Crear Talla
        </Button>
        <Accordion className="mt-3">
          {tipoProductos.map((tipoProducto) => (
            <Accordion.Item eventKey={tipoProducto.id} key={tipoProducto.id}>
              <Accordion.Header>
                <Image
                  fluid
                  className="image-preview me-3"
                  src={`https://catalogo-backend-production-baf9.up.railway.app${tipoProducto.rutaImagen}`}
                />
                {tipoProducto.nombre}
              </Accordion.Header>
              <Accordion.Body>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => openPopup(tipoProducto)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(tipoProducto.id)}
                >
                  Borrar
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
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
    </>
  )
}

export default TipoProductoCRUD
