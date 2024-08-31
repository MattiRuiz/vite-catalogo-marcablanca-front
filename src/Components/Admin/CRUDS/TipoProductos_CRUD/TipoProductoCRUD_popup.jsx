import { useState, useEffect } from 'react'
import { Form, Spinner, Image, Row, Col, Ratio } from 'react-bootstrap'

import {
  createTipoProducto,
  updateTipoProducto,
} from '../../../../Functions/TipoProductosFunctions'

import { PiGearSixDuotone, PiPlusCircleDuotone } from 'react-icons/pi'

import { Boton, PopUp, Input } from '../../../../ui'

const TallasCRUD_popup = ({
  tipoProducto,
  onTipoProductoUpdated,
  closePopUp,
  showToast,
}) => {
  const [tipoProductoData, setTipoProductoData] = useState({
    nombre: '',
    imagen: '',
  })
  const [loading, setLoading] = useState(false)
  const [loadingImagen, setLoadingImagen] = useState(false)

  useEffect(() => {
    if (tipoProducto) {
      setTipoProductoData({
        nombre: tipoProducto.nombre || '',
        imagen: tipoProducto.imagen || '',
      })
    }
  }, [tipoProducto])

  const handleGuardar = async () => {
    setLoading(true)

    const dataToSend = {
      ...tipoProductoData,
    }
    const formDataForAPI = new FormData()
    formDataForAPI.append('nombre', dataToSend.nombre)
    formDataForAPI.append('imagen', dataToSend.imagen)

    if (tipoProducto) {
      const id = tipoProducto.id

      const response = await updateTipoProducto(id, formDataForAPI)
      setLoading(false)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al actualizar el tipo de producto.'
        )
      } else {
        showToast(
          'success',
          'Tipo de producto actualizado',
          ' El tipo de producto ha sido actualizado con éxito.'
        )
        onTipoProductoUpdated()
        closePopUp()
      }
    } else {
      const response = await createTipoProducto(formDataForAPI)
      setLoading(false)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al crear un tipo de producto.'
        )
      } else {
        showToast(
          'success',
          'Tipo de producto creado',
          'El tipo de producto ha sido creado con éxito.'
        )
        onTipoProductoUpdated()
        closePopUp()
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTipoProductoData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCambiarImagen = async (event) => {
    setLoadingImagen(true)
    const dataToSend = {
      imagen: event.target.files[0],
      nombre: tipoProducto.nombre,
    }

    const formDataForAPI = new FormData()
    formDataForAPI.append('nombre', dataToSend.nombre)
    formDataForAPI.append('imagen', dataToSend.imagen)

    const id = tipoProducto.id

    try {
      await updateTipoProducto(id, formDataForAPI)
      showToast(
        'success',
        'Imagen editada',
        'La imagen ha sido editada con éxito.'
      )
    } catch (e) {
      showToast(
        'danger',
        'Error',
        'Hubo un problema al querer modificar la imagen.'
      )
    }
    setLoadingImagen(false)
    closePopUp()
    onTipoProductoUpdated()
  }

  return (
    <PopUp
      header={
        tipoProducto ? (
          <>
            <PiGearSixDuotone className="me-2" /> Editar un tipo de producto
          </>
        ) : (
          <>
            <PiPlusCircleDuotone className="me-2" /> Añadir un tipo de producto
          </>
        )
      }
      closePopUp={closePopUp}
      buttonLabel="Guardar"
      onAction={handleGuardar}
      loading={loading}
      variant="primary"
    >
      <Form>
        <Input
          label="Nombre del tipo de producto:"
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={tipoProductoData.nombre}
          onChange={handleInputChange}
        />
        {tipoProducto ? (
          <Row className="justify-content-center">
            <Col
              xs={4}
              className="border border-end-0 py-2"
              style={{ borderRadius: '8px 0 0 8px' }}
            >
              <Ratio aspectRatio="1x1" className="rounded-3">
                <Image
                  fluid
                  className="object-fit-cover rounded-3"
                  src={tipoProducto.rutaImagen}
                />
              </Ratio>
            </Col>
            <Col
              xs={7}
              className="d-flex align-items-start flex-column justify-content-center border border-start-0"
              style={{ borderRadius: '0 8px 8px 0' }}
            >
              <p className="mb-3">Imágen seleccionada</p>
              <label htmlFor="fileInput">
                <Boton as="span" disabled={loadingImagen}>
                  {loadingImagen ? (
                    <Spinner
                      animation="border"
                      variant="light"
                      size="sm"
                      className="mx-4"
                    />
                  ) : (
                    'Cambiar imagen'
                  )}
                </Boton>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleCambiarImagen}
                />
              </label>
            </Col>
          </Row>
        ) : (
          <Input
            label="Imágen:"
            className="mb-3"
            type="file"
            name="imagen"
            onChange={(e) =>
              setTipoProductoData({
                ...tipoProductoData,
                imagen: e.target.files[0],
              })
            }
          />
        )}
      </Form>
    </PopUp>
  )
}

export default TallasCRUD_popup
