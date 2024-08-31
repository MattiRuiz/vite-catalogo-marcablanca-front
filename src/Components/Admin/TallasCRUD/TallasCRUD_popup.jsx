import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

import { createTalla, updateTalla } from '../../../Functions/TallasFunctions'

import { PiGearSixDuotone, PiPlusCircleDuotone } from 'react-icons/pi'

import { PopUp, Input } from '../../../ui'

const TallasCRUD_popup = ({ talla, onTallaUpdated, closePopUp, showToast }) => {
  const [tallaData, setTallaData] = useState({
    nombre: '',
    dimensiones: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (talla) {
      setTallaData({
        nombre: talla.nombre || '',
        dimensiones: talla.dimensiones || '',
      })
    }
  }, [talla])

  const handleGuardar = async () => {
    setLoading(true)
    const dataToSend = {
      ...tallaData,
    }

    if (!dataToSend.nombre && !dataToSend.dimensiones) {
      showToast('danger', 'Error', 'Ambos campos no pueden encontrarse vacíos.')
      setLoading(false)
    } else if (talla) {
      const id = talla.id
      const response = await updateTalla(id, dataToSend)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al actualizar la medida.'
        )
      } else {
        showToast(
          'success',
          'Medida actualizada',
          'La medida ha sido actualizada con éxito.'
        )
        onTallaUpdated()
        closePopUp()
      }
      setLoading(false)
    } else {
      const response = await createTalla(dataToSend)
      if (!response) {
        showToast(
          'danger',
          'Error',
          'Hubo un problema al crear una medida nueva'
        )
      } else {
        showToast(
          'success',
          'Medida creada',
          'La medida ha sido creada con éxito'
        )
        onTallaUpdated()
        closePopUp()
      }
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTallaData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <PopUp
      header={
        talla ? (
          <>
            <PiGearSixDuotone className="me-2" /> Editar una medida
          </>
        ) : (
          <>
            <PiPlusCircleDuotone className="me-2" /> Añadir una medida
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
          label={
            <>
              Nombre de la medida <span className="text-danger">*</span>:
            </>
          }
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={tallaData.nombre}
          onChange={handleInputChange}
        />
        <Input
          label={
            <>
              {' '}
              Dimensiones <span className="text-danger">*</span>:
            </>
          }
          type="text"
          placeholder="Dimensiones"
          name="dimensiones"
          value={tallaData.dimensiones}
          onChange={handleInputChange}
        />
        <p className="texto-14">
          <em>
            <span className="text-danger">*</span> Uno de los valores puede
            encontrarse en vacío pero no ambos.
          </em>
        </p>
      </Form>
    </PopUp>
  )
}

export default TallasCRUD_popup
