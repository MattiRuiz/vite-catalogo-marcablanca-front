import { useState, useEffect } from 'react'
import { Modal, Button, Image, Row, Col, Spinner, Ratio } from 'react-bootstrap'

import {
  getImagenesPorProducto,
  createImagen,
  deleteImagen,
} from '../../../../Functions/ProductosFunctions'

import PopUpBorrarImagen from './PopUpBorrarImagen'

const ImagenesCRUD_popup = ({ producto, closePopUp }) => {
  const baseUrl = import.meta.env.VITE_NAME
  const [loading, setLoading] = useState(false)
  const [imagenes, setImagenes] = useState(null)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [selectedImagen, setSelectedImagen] = useState(null)

  const fetchImagenes = async () => {
    try {
      const response = await getImagenesPorProducto(producto.id)
      setImagenes(response.data)
    } catch (e) {
      console.error(e.message)
    }
  }

  const handleAgregarImagen = async (event) => {
    setLoading(true)
    const dataToSend = {
      imagen: event.target.files[0],
      idProducto: producto.id,
    }

    const formDataForAPI = new FormData()
    formDataForAPI.append('imagen', dataToSend.imagen)
    formDataForAPI.append('idProducto', dataToSend.idProducto)

    const response = await createImagen(formDataForAPI)
    setLoading(false)
    fetchImagenes()
  }

  const openPopUpBorrar = (imagen) => {
    setSelectedImagen(imagen)
    setPopUpBorrar(true)
  }

  useEffect(() => {
    fetchImagenes()
  }, [])

  return (
    <>
      <Modal show={true} onHide={closePopUp} centered>
        <Modal.Header className="border-0 bg-primario text-white" closeButton>
          <Modal.Title>Editar carrusel de imágenes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <p className="texto-14">
              En esta sección se puede agregar o borrar imágenes en el carrusel.
              Para cambiar la imágen de portada hay ir a{' '}
              <strong>editar producto</strong>.
            </p>
            {imagenes ? (
              imagenes.map((imagen, index) => (
                <Col xs={4} key={index} className="position-relative">
                  <Ratio aspectRatio="1x1">
                    <Image
                      src={imagen.rutaImagen}
                      alt={imagen.rutaImagen}
                      fluid
                    />
                  </Ratio>
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute"
                    style={{ bottom: '5px', right: '16px' }}
                    onClick={() => openPopUpBorrar(imagen)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </Button>
                </Col>
              ))
            ) : (
              <></>
            )}
            {loading ? (
              <Col xs={4}>
                <Spinner className="my-3 d-block mx-auto" animation="border" />
              </Col>
            ) : (
              ''
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <label htmlFor="fileInput">
            <Button as="span">Agregar una imagen</Button>
            <input
              id="fileInput"
              type="file"
              style={{ display: 'none' }}
              onChange={handleAgregarImagen}
            />
          </label>
          <Button variant="secondary" onClick={() => closePopUp()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      {popUpBorrar ? (
        <PopUpBorrarImagen
          imagen={selectedImagen}
          onImagenUpdated={() => fetchImagenes()}
          closePopUp={() => setPopUpBorrar(false)}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default ImagenesCRUD_popup
