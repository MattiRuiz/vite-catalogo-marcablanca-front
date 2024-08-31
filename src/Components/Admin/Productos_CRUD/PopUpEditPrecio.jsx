import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

import { getAllMarcas } from '../../../Functions/MarcasFunctions'
import { getAllTipoProductos } from '../../../Functions/TipoProductosFunctions'
import { editPrecioEnGrupo } from '../../../Functions/ProductosFunctions'

import { PopUp, Input } from '../../../ui'
import { PiGearSixDuotone } from 'react-icons/pi'

const PopUpEditPrecio = ({ onProductoUpdated, closePopUp, showToast }) => {
  const [porcentaje, setPorcentaje] = useState('')
  const [marcas, setMarcas] = useState()
  const [tipoProductos, setTipoProductos] = useState()
  const [loading, setLoading] = useState(false)
  const [selectedMarca, setSelectedMarca] = useState()
  const [selectedTipoProducto, setSelectedTipoProducto] = useState()

  const fetchData = async () => {
    try {
      const marcasResponse = await getAllMarcas()
      setMarcas(marcasResponse.data)
      const tipoProductoResponse = await getAllTipoProductos()
      setTipoProductos(tipoProductoResponse.data)
    } catch (e) {
      showToast(
        'danger',
        'Problema de carga',
        'Hubo un problema al actualizar la información.'
      )
      console.log(e.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleGuardar = async () => {
    setLoading(true)

    if (!porcentaje || !selectedMarca || !selectedTipoProducto) {
      showToast(
        'danger',
        'Error',
        'Hay campos vacíos, por favor complete todos los datos para continuar.'
      )
      setLoading(false)
    } else {
      try {
        const aumento = (Number(porcentaje) + 100) / 100

        const dataToSend = {
          aumento,
          marcaId: Number(selectedMarca),
          tipoProducto_id: Number(selectedTipoProducto),
        }
        const response = await editPrecioEnGrupo(dataToSend)
        setLoading(false)

        if (!response) {
          showToast(
            'danger',
            'Error',
            'Hubo un problema al actualizar los precios.'
          )
        } else {
          showToast(
            'success',
            'Precios actualizados',
            'Los precios han sido actualizados con éxito.'
          )
          onProductoUpdated()
          closePopUp()
        }
      } catch (e) {
        console.error(e.message)
        showToast(
          'danger',
          'Error',
          'Hubo un problema al querer ejecutar la función de precios.'
        )
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <PopUp
      header={
        <>
          <PiGearSixDuotone className="me-2" /> Editar precios en grupo
        </>
      }
      closePopUp={closePopUp}
      buttonLabel="Guardar"
      onAction={handleGuardar}
      loading={loading}
      variant="primary"
    >
      <Form>
        <Input
          label="Porcentaje de aumento:"
          type="string"
          placeholder="Porcentaje"
          value={porcentaje}
          onChange={(e) => setPorcentaje(e.target.value)}
        />
        <Form.Group>
          <Form.Label>Marca a aumentar:</Form.Label>
          <Form.Select
            className="mb-3"
            value={selectedMarca}
            onChange={(e) => setSelectedMarca(e.target.value)}
          >
            <option value="">Seleccione una marca</option>
            {marcas &&
              marcas.map((marca) => (
                <option key={marca.id} value={marca.id}>
                  {marca.nombre}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Tipo de producto a aumentar:</Form.Label>
          <Form.Select
            className="mb-3"
            value={selectedTipoProducto}
            onChange={(e) => setSelectedTipoProducto(e.target.value)}
          >
            <option value="">Seleccione un tipo de producto</option>
            {tipoProductos &&
              tipoProductos.map((tipoProducto) => (
                <option key={tipoProducto.id} value={tipoProducto.id}>
                  {tipoProducto.nombre}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      </Form>
    </PopUp>
  )
}

export default PopUpEditPrecio
