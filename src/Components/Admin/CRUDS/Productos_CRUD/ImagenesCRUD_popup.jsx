import { useState, useEffect } from 'react'
import { Modal, Button, Image, Row, Col, Spinner, Ratio } from 'react-bootstrap'

import {
  getImagenesPorProducto,
  createImagen,
} from '../../../../Functions/ProductosFunctions'

import PopUpBorrarImagen from './PopUpBorrarImagen'

const ImagenesCRUD_popup = ({ producto, closePopUp }) => {
  const [loading, setLoading] = useState(false)
  const [imagenes, setImagenes] = useState(null)
  const [popUpBorrar, setPopUpBorrar] = useState(false)
  const [selectedImagen, setSelectedImagen] = useState(null)

  const fetchImagenes = async () => {
    setLoading(true)
    try {
      const response = await getImagenesPorProducto(producto.id)
      setImagenes(response.data)
    } catch (e) {
      console.error(e.message)
    } finally {
      setLoading(false)
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
          <p className="texto-14">
            En esta sección se puede agregar o borrar imágenes en el carrusel.
            Para cambiar la imágen de portada hay ir a{' '}
            <strong>editar producto</strong>.
          </p>
          <Row>
            {imagenes ? (
              imagenes.map((imagen, index) => (
                <Col xs={4} key={index} className="position-relative mb-3">
                  <Ratio aspectRatio="1x1" className="border">
                    <Image
                      src={imagen.rutaImagen}
                      alt={imagen.rutaImagen}
                      className="object-fit-cover"
                      fluid
                    />
                  </Ratio>
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute rounded-circle shadow-sm"
                    style={{ bottom: '5px', right: '16px', padding: '2px 7px' }}
                    onClick={() => openPopUpBorrar(imagen)}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '14px', lineHeight: 1.7 }}
                    >
                      delete
                    </span>
                  </Button>
                </Col>
              ))
            ) : (
              <></>
            )}
            {loading ? (
              <Col xs={4} className="d-flex align-items-center">
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
