import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

import {
  createTallaProducto,
  updateTallaProducto,
} from '../../../Functions/TallasProductosFunctions'
import { getAllTallas } from '../../../Functions/TallasFunctions'
import TallasCRUD_popup from '../TallasCRUD/TallasCRUD_popup'

import {
  PiGearSixDuotone,
  PiPlusCircleDuotone,
  PiPlusCircleBold,
} from 'react-icons/pi'
import { PopUp, BotonSecundario } from '../../../ui'

const TallaProductoCreate_popup = ({
  selectedTallaProducto,
  producto,
  onProductoUpdated,
  closePopUp,
  showToast,
}) => {
  const [tallas, setTallas] = useState({})
  const [loading, setLoading] = useState(false)
  const [popUpTalla, setPopUpTalla] = useState(false)
  const [tallaSelected, setTallaSelected] = useState({
    stock: 0,
    precio: '',
    tallas_id: '',
    dimensiones: '',
    productos_id: producto.id,
  })

  const getTallas = async () => {
    try {
      const response = await getAllTallas()
      const sortedTallas = response.data.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      )
      setTallas(sortedTallas)
    } catch (e) {
      console.error(e)
      showToast(
        'danger',
        'Problema de carga',
        'Hubo un problema al actualizar la información.'
      )
    }
  }

  useEffect(() => {
    getTallas()
  }, [])

  useEffect(() => {
    if (selectedTallaProducto) {
      setTallaSelected({
        stock: selectedTallaProducto.stock || 0,
        precio: selectedTallaProducto.precio || '',
        tallas_id: selectedTallaProducto.tallas.id || '',
        dimensiones: selectedTallaProducto.dimensiones || '',
        productos_id: producto.id,
      })
    }
  }, [selectedTallaProducto])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTallaSelected((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleStock = (e) => {
    if (e.target.checked) {
      setTallaSelected((prevData) => ({
        ...prevData,
        stock: 1,
      }))
    } else {
      setTallaSelected((prevData) => ({
        ...prevData,
        stock: 0,
      }))
    }
  }

  const handleGuardar = async () => {
    setLoading(true)

    const dataToSend = {
      ...tallaSelected,
    }

    if (!dataToSend.precio || !dataToSend.tallas_id) {
      showToast(
        'danger',
        'Error',
        'No se puede crear una medida de producto sin medida o precio.'
      )
      setLoading(false)
    } else if (selectedTallaProducto) {
      const id = selectedTallaProducto.id
      const response = await updateTallaProducto(id, dataToSend)
      setLoading(false)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al querer actualizar la información.'
        )
      } else {
        showToast(
          'success',
          'Medida actualizada',
          'La medida de este producto ha sido actualizada con éxito.'
        )
        onProductoUpdated()
        closePopUp()
      }
    } else {
      const response = await createTallaProducto(dataToSend)
      setLoading(false)
      if (!response) {
        showToast('danger', 'Error', 'Hubo un problema al crear una medida.')
      } else {
        showToast(
          'success',
          'Medida creada',
          'La medida del producto ha sido creada con éxito.'
        )
        onProductoUpdated()
        closePopUp()
      }
    }
  }

  return (
    <PopUp
      header={
        selectedTallaProducto ? (
          <>
            <PiGearSixDuotone className="me-2" /> Editar una medida de producto
          </>
        ) : (
          <>
            <PiPlusCircleDuotone className="me-2" /> Añadir una medida al
            producto
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
        <Form.Label>
          Medida <span className="text-danger">*</span>
        </Form.Label>
        <div className="d-flex mb-3">
          <Form.Select
            className=""
            name="tallas_id"
            value={tallaSelected.tallas_id}
            onChange={handleInputChange}
          >
            <option value="">Selecciona una medida</option>
            {tallas.length > 0 &&
              tallas.map((medida) => (
                <option key={medida.id} value={medida.id}>
                  {medida.nombre}
                </option>
              ))}
          </Form.Select>
          <BotonSecundario
            className="px-3"
            onClick={() => setPopUpTalla(true)}
            type="button"
          >
            Añadir <PiPlusCircleBold className="ms-2" />
          </BotonSecundario>
        </div>
        <Form.Label>Dimensiones</Form.Label>
        <Form.Control
          type="text"
          className="mb-3"
          name="dimensiones"
          value={tallaSelected.dimensiones}
          onChange={handleInputChange}
        />
        <Form.Label>
          Precio <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="number"
          className="mb-3"
          name="precio"
          value={tallaSelected.precio}
          onChange={handleInputChange}
        />

        <Form.Check
          type="checkbox"
          label={tallaSelected.stock ? 'Con stock' : 'Sin stock'}
          className="mb-2 mt-1"
          checked={tallaSelected.stock}
          onChange={handleStock}
        />
      </Form>
      {popUpTalla && (
        <TallasCRUD_popup
          onTallaUpdated={() => getTallas()}
          closePopUp={() => setPopUpTalla(false)}
          showToast={showToast}
        />
      )}
    </PopUp>
  )
}

export default TallaProductoCreate_popup
