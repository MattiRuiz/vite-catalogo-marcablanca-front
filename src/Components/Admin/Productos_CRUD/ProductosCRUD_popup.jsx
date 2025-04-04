import { useState, useEffect } from 'react'
import { Form, Spinner, Image, Row, Col, Ratio } from 'react-bootstrap'

import {
  createProducto,
  updateProducto,
} from '../../../Functions/ProductosFunctions'
import { getAllMarcas } from '../../../Functions/MarcasFunctions'
import { getAdminTipoProductos } from '../../../Functions/TipoProductosFunctions'

import { PopUp, Input, Boton } from '../../../ui'
import { PiGearSixDuotone, PiPlusCircleDuotone } from 'react-icons/pi'

const ProductosCRUD_popup = ({
  producto,
  selectedCategoria,
  onProductoUpdated,
  closePopUp,
  showToast,
}) => {
  const [productoData, setProductoData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
    marcasId: '',
    tipoProductoId: '',
    adminsId: '',
  })
  const [marcas, setMarcas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingImagen, setLoadingImagen] = useState(false)

  useEffect(() => {
    if (producto) {
      setProductoData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        imagen: producto.imagen,
        marcasId: producto.marcas ? producto.marcas.id : '',
        tipoProductoId: selectedCategoria,
        adminsId: 1,
      })
    }
  }, [producto])

  const fetchData = async () => {
    setLoading(true)
    try {
      const responseMarcas = await getAllMarcas()
      setMarcas(responseMarcas.data)
      const responseCategorias = await getAdminTipoProductos()
      setCategorias(responseCategorias.data)
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

  const handleGuardar = async () => {
    setLoading(true)

    const dataToSend = {
      ...productoData,
    }
    const formDataForAPI = new FormData()
    formDataForAPI.append('nombre', dataToSend.nombre)
    formDataForAPI.append('descripcion', dataToSend.descripcion)
    formDataForAPI.append('imagen', dataToSend.imagen)
    formDataForAPI.append('marcas_id', dataToSend.marcasId)
    formDataForAPI.append('tipo_producto_id', dataToSend.tipoProductoId)
    formDataForAPI.append('admins_id', dataToSend.adminsId)
    if (producto) {
      const id = producto.id
      const response = await updateProducto(id, formDataForAPI)
      setLoading(false)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al querer actualizar el producto'
        )
      } else {
        showToast(
          'success',
          'Producto actualizado',
          'El producto ha sido actualizada con éxito'
        )
        onProductoUpdated()
        closePopUp()
      }
    } else {
      const response = await createProducto(formDataForAPI)
      setLoading(false)
      if (response.status === 200) {
        showToast(
          'success',
          'Producto creado',
          'El producto ha sido creado con éxito.'
        )
        onProductoUpdated()
        closePopUp()
      } else {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al crear un nuevo producto.'
        )
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductoData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCambiarImagen = async (event) => {
    setLoadingImagen(true)

    const dataToSend = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      imagen: event.target.files[0],
      marcasId: producto.marcas ? producto.marcas.id : '',
      tipoProductoId: selectedCategoria,
      adminsId: 1,
    }

    const formDataForAPI = new FormData()
    formDataForAPI.append('nombre', dataToSend.nombre)
    formDataForAPI.append('descripcion', dataToSend.descripcion)
    formDataForAPI.append('imagen', dataToSend.imagen)
    formDataForAPI.append('marcas_id', dataToSend.marcasId)
    formDataForAPI.append('tipo_producto_id', dataToSend.tipoProductoId)
    formDataForAPI.append('admins_id', dataToSend.adminsId)

    const id = producto.id

    try {
      const response = await updateProducto(id, formDataForAPI)
      console.log('Imagen editada', response)
      showToast(
        'success',
        'Imagen editada',
        'La imagen ha sido editada con éxito.'
      )
      onProductoUpdated()
      closePopUp()
    } catch (e) {
      showToast('danger', 'Error', 'Hubo un problema al reemplazar la imagen.')
      console.error(e.message)
    }
    setLoadingImagen(false)
  }

  return (
    <>
      <PopUp
        header={
          producto ? (
            <>
              <PiGearSixDuotone className="me-2" /> Editar un producto
            </>
          ) : (
            <>
              <PiPlusCircleDuotone className="me-2" /> Añadir un producto
            </>
          )
        }
        closePopUp={closePopUp}
        buttonLabel="Guardar"
        onAction={handleGuardar}
        loading={loading}
        variant="primary"
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            handleGuardar()
          }}
        >
          <Input
            label={
              <>
                Nombre del producto <span className="text-danger">*</span>
              </>
            }
            type="text"
            name="nombre"
            value={productoData.nombre}
            onChange={handleInputChange}
          />
          <Input
            label="Descripción"
            type="text"
            name="descripcion"
            value={productoData.descripcion}
            onChange={handleInputChange}
          />
          <Form.Label>
            Tipo de producto <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            className="mb-3"
            value={productoData.tipoProductoId}
            onChange={(e) =>
              setProductoData({
                ...productoData,
                tipoProductoId: e.target.value,
              })
            }
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Marca</Form.Label>
          <Form.Select
            className="mb-3"
            value={productoData.marcasId}
            onChange={(e) =>
              setProductoData({ ...productoData, marcasId: e.target.value })
            }
          >
            <option value="">Selecciona una marca</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </Form.Select>
          {producto ? (
            <Row className="justify-content-center">
              <Col
                xs={4}
                className="px-0 border border-end-0"
                style={{ borderRadius: '8px 0 0 8px' }}
              >
                <Ratio aspectRatio="1x1">
                  <Image
                    style={{ borderRadius: '8px 0 0 8px' }}
                    fluid
                    className="object-fit-cover"
                    src={producto.rutaImagen}
                  />
                </Ratio>
              </Col>
              <Col
                xs={7}
                className="d-flex align-items-start flex-column justify-content-center border border-start-0"
                style={{ borderRadius: '0 8px 8px 0' }}
              >
                <p className="mb-2">
                  Imágen de portada <span className="text-danger">*</span>
                </p>
                <label htmlFor="fileInput">
                  <Boton as="span">
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
            <>
              <Input
                label={
                  <>
                    Imágen de portada <span className="text-danger">*</span>
                  </>
                }
                type="file"
                name="imagen"
                onChange={(e) =>
                  setProductoData({
                    ...productoData,
                    imagen: e.target.files[0],
                  })
                }
              />
            </>
          )}
        </Form>
      </PopUp>
    </>
  )
}

export default ProductosCRUD_popup
