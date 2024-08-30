import { useState, useEffect } from 'react'
import { Modal, Image, Row, Col, Spinner, Ratio } from 'react-bootstrap'

import {
  getImagenesPorProducto,
  createImagen,
  deleteImagen,
} from '../../../../Functions/ProductosFunctions'

import { PopUp, Boton } from '../../../../ui'

import {
  PiTrashBold,
  PiGearSixDuotone,
  PiImageDuotone,
  PiXCircleDuotone,
} from 'react-icons/pi'

const ImagenesCRUD_popup = ({ producto, closePopUp, showToast }) => {
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
    fetchImagenes()
  }, [])

  const handleAgregarImagen = async (event) => {
    setLoading(true)

    const dataToSend = {
      imagen: event.target.files[0],
      idProducto: producto.id,
    }

    const formDataForAPI = new FormData()
    formDataForAPI.append('imagen', dataToSend.imagen)
    formDataForAPI.append('idProducto', dataToSend.idProducto)

    try {
      await createImagen(formDataForAPI)
      showToast(
        'success',
        'Imagen agregada',
        'La imagen ha sido agregada al carrusel con éxito.'
      )
      fetchImagenes()
    } catch (e) {
      showToast(
        'danger',
        'Error',
        'Hubo un problema al agregar una imagen al carrusel.'
      )
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const openPopUpBorrar = (imagen) => {
    setSelectedImagen(imagen)
    setPopUpBorrar(true)
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteImagen(selectedImagen.id)
      showToast(
        'success',
        'Imagen eliminada',
        'La imagen ha sido eliminada del carrusel con éxito.'
      )
      fetchImagenes()
      setPopUpBorrar(false)
    } catch (e) {
      alert('Hubo un problema al eliminar la imagen.')
      showToast('danger', 'Error', 'Hubo un problema al eliminar una imagen.')
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

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
                    <p className="text-center lh-sm mb-0">Añadir una imagen</p>
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleAgregarImagen}
                    />
                  </div>
                </Ratio>
              </label>
            </Col>
            {imagenes &&
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
                  <Boton
                    variant="danger"
                    size="sm"
                    className="position-absolute"
                    style={{ top: '5px', right: '16px' }}
                    onClick={() => openPopUpBorrar(imagen)}
                  >
                    <PiTrashBold />
                  </Boton>
                </Col>
              ))}
            {loading && (
              <Col xs={4} className="d-flex align-items-center">
                <Spinner className="my-3 d-block mx-auto" animation="border" />
              </Col>
            )}
          </Row>
        </Modal.Body>
      </Modal>
      {popUpBorrar && (
        <PopUp
          header={
            <>
              <PiXCircleDuotone className="me-2 text-danger" />
              Borrar imagen
            </>
          }
          closePopUp={() => setPopUpBorrar(false)}
          buttonLabel="Borrar"
          onAction={handleDelete}
          loading={loading}
        >
          <p>¿Está seguro que desea borrar esa imagen?</p>
        </PopUp>
      )}
    </>
  )
}

export default ImagenesCRUD_popup
