import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { createMarca, updateMarca } from '../../../Functions/MarcasFunctions'

import { PopUp, Input } from '../../../ui'
import { PiGearSixDuotone, PiPlusCircleDuotone } from 'react-icons/pi'

const MarcasCRUD_popup = ({ marca, onMarcaUpdated, closePopUp, showToast }) => {
  const [marcaData, setMarcaData] = useState({
    nombre: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (marca) {
      setMarcaData({
        nombre: marca.nombre || '',
      })
    }
  }, [marca])

  const handleGuardar = async () => {
    setLoading(true)

    const dataToSend = {
      ...marcaData,
    }

    if (!dataToSend.nombre) {
      showToast(
        'danger',
        'Error',
        'Hay campos vacíos, por favor complete todos los datos para continuar.'
      )
      setLoading(false)
    } else if (marca) {
      const id = marca.id
      const response = await updateMarca(id, dataToSend)
      setLoading(false)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al querer actualizar la marca.'
        )
      } else {
        showToast(
          'success',
          'Marca actualizada',
          'La marca ha sido actualizada con éxito.'
        )
        onMarcaUpdated()
        closePopUp()
      }
    } else {
      const response = await createMarca(dataToSend)
      setLoading(false)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al crear una marca nueva.'
        )
      } else {
        showToast(
          'success',
          'Marca creada',
          'La marca ha sido creada con éxito.'
        )
        onMarcaUpdated()
        closePopUp()
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setMarcaData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <PopUp
      header={
        marca ? (
          <>
            <PiGearSixDuotone className="me-2" /> Editar una marca
          </>
        ) : (
          <>
            <PiPlusCircleDuotone className="me-2" /> Añadir una marca
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
          label="Nombre de la empresa:"
          type="text"
          name="nombre"
          value={marcaData.nombre}
          onChange={handleInputChange}
        />
      </Form>
    </PopUp>
  )
}

export default MarcasCRUD_popup
