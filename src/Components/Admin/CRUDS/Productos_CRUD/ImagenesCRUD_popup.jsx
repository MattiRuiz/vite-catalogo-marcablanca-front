import { useState, useEffect } from 'react'
import { Modal, Button, Image, Row, Col, Spinner, Ratio } from 'react-bootstrap'

import {
  getImagenesPorProducto,
  createImagen,
} from '../../../../Functions/ProductosFunctions'

import PopUpBorrarImagen from './PopUpBorrarImagen'

import { PiTrashBold, PiGearSixDuotone, PiImageDuotone } from 'react-icons/pi'

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
        <Modal.Header className="pb-2 border-0 bg-secondary-subtle" closeButton>
          <Modal.Title className="fw-bold d-flex align-items-center">
            <PiGearSixDuotone className="me-2" />
            Editar carrusel de imágenes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <p className="texto-14">
            En esta sección se puede agregar o borrar imágenes en el carrusel.
            Para cambiar la imágen de portada hay ir a{' '}
            <strong>editar producto</strong>.
          </p>
          <Row>
            <Col xs={4} className="position-relative mb-3">
              <label htmlFor="fileInput" className="w-100 h-100">
                <Ratio
                  aspectRatio="1x1"
                  className="rounded"
                  style={{
                    border: '1px dashed var(--bs-border-color)',
                    cursor: 'pointer',
                  }}
                >
                  <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <PiImageDuotone className="fs-1 opacity-75" />
                    <p>Añadir una imagen</p>
                  </div>
                </Ratio>
              </label>
            </Col>
            {imagenes ? (
              imagenes.map((imagen, index) => (
                <Col xs={4} key={index} className="position-relative mb-3">
                  <Ratio aspectRatio="1x1" className="border rounded">
                    <Image
                      src={imagen.rutaImagen}
                      alt={imagen.rutaImagen}
                      className="object-fit-cover rounded"
                      fluid
                    />
                  </Ratio>
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute bg-gradient border-0"
                    style={{ top: '5px', right: '16px' }}
                    onClick={() => openPopUpBorrar(imagen)}
                  >
                    <PiTrashBold />
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
        {/* <Modal.Footer className="border-0 pt-0">
          <label htmlFor="fileInput">
            <Button className="bg-gradient border-0" as="span">
              Agregar imagen
            </Button>
            <input
              id="fileInput"
              type="file"
              style={{ display: 'none' }}
              onChange={handleAgregarImagen}
            />
          </label>
          <Button
            variant="secondary"
            className="bg-gradient border-0"
            onClick={() => closePopUp()}
          >
            Cerrar
          </Button>
        </Modal.Footer> */}
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
