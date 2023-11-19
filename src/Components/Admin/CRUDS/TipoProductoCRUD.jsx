import { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Accordion } from 'react-bootstrap'

import {
  getAllTipoProductos,
  createTipoProducto,
  updateTipoProducto,
  deleteTipoProducto,
} from '../../../Functions/TipoProductosFunctions'

const TipoProductoCRUD = () => {
  const [tipoProductos, setTipoProductos] = useState([])
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({ nombre: '', imagen: null })
  const [editData, setEditData] = useState({})

  const fetchData = async () => {
    try {
      const response = await getAllTipoProductos()
      setTipoProductos(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreate = async () => {
    try {
      const formDataForAPI = new FormData()
      formDataForAPI.append('nombre', formData.nombre)
      formDataForAPI.append('imagen', formData.imagen)

      await createTipoProducto(formDataForAPI)
      setCreating(false)
      setFormData({ nombre: '', imagen: null })
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditOpen = (tipoProducto) => {
    setCreating(false)
    setEditing(true)
    setEditData(tipoProducto)
    setFormData({ nombre: tipoProducto.nombre, imagen: tipoProducto.imagen })
  }

  const handleUpdate = async () => {
    try {
      const formDataForAPI = new FormData()
      formDataForAPI.append('nombre', formData.nombre)
      formDataForAPI.append('imagen', formData.imagen)

      await updateTipoProducto(editData.id, formDataForAPI)
      setEditing(false)
      setEditData({})
      setFormData({ nombre: '', imagen: null })
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTipoProducto(id)
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Col xs={12}>
        <Button
          variant="outline-light"
          className="mt-3"
          onClick={() => {
            setCreating(true)
            setEditing(false)
            setFormData({ nombre: '', imagen: null })
          }}
        >
          Crear Tipo de Producto
        </Button>
        <Accordion className="mt-3">
          {tipoProductos.map((tipoProducto) => (
            <Accordion.Item eventKey={tipoProducto.id} key={tipoProducto.id}>
              <Accordion.Header>{tipoProducto.nombre}</Accordion.Header>
              <Accordion.Body>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-1"
                  onClick={() => handleEditOpen(tipoProducto)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(tipoProducto.id)}
                >
                  Borrar
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Col>
      <Row>
        {creating && (
          <Col xs={12} className="rounded bg-light mt-3 p-3">
            <Col className="d-flex justify-content-between">
              <h6 className="text-black py-3">Crear Tipo de Producto</h6>
              <Button
                size="sm"
                variant="light"
                onClick={() => setCreating(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </Button>
            </Col>
            <Form.Group>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Nombre del tipo de producto"
                value={formData.nombre || ''}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Control
                type="file"
                className="form-control mt-2"
                onChange={(e) =>
                  setFormData({ ...formData, imagen: e.target.files[0] })
                }
              />
            </Form.Group>
            <Button className="my-3" onClick={handleCreate}>
              Guardar
            </Button>
          </Col>
        )}
        {editing && (
          <Col xs={12} className="rounded bg-light mt-3 p-3">
            <Col className="d-flex justify-content-between">
              <h6 className="text-black py-3">Editar Tipo de Producto</h6>
              <Button
                size="sm"
                variant="light"
                onClick={() => setEditing(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </Button>
            </Col>
            <Form.Group>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Nombre del tipo de producto"
                value={formData.nombre || editData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
              <Form.Control
                type="file"
                className="form-control mt-2"
                onChange={(e) =>
                  setFormData({ ...formData, imagen: e.target.files[0] })
                }
              />
            </Form.Group>
            <Button className="my-3" onClick={handleUpdate}>
              Guardar Cambios
            </Button>
          </Col>
        )}
      </Row>
    </>
  )
}

export default TipoProductoCRUD
