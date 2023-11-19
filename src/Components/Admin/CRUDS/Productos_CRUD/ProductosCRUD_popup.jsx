import { useState, useEffect } from 'react';
import { Button, Col, FormControl, FormGroup, FormSelect, Modal } from 'react-bootstrap';
import { createProducto, updateProducto } from '../../../../Functions/ProductosFunctions';

const ProductosCRUD_popup = ({ producto, categorias, marcas, onProductoUpdated, closePopUp }) => {
  const [productoData, setProductoData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
    marcasId: '',
    tipoProductoId: '',
    adminsId: '',
  });

    //#region UseEffect
    useEffect(() => {
        if (producto) {
            setProductoData({
                nombre: producto.nombre || '',
                descripcion: producto.descripcion || '',
                imagen: producto.imagen ,
                marcasId: producto.marcas.id,
                tipoProductoId: producto.tipo_producto.id,
                adminsId: 1,            
            });
        }
    }, [producto]);
    //#endregion

    //#region Handle guardar cambios (CREAR O EDITAR)
    const handleGuardar = async () => {
    const dataToSend = {
      ...productoData,
    };
    
    const formDataForAPI = new FormData();
    formDataForAPI.append("nombre", dataToSend.nombre);
    formDataForAPI.append("descripcion", dataToSend.descripcion);
    formDataForAPI.append("imagen", dataToSend.imagen);
    formDataForAPI.append("marcas_id", dataToSend.marcasId);
    formDataForAPI.append("tipo_producto_id", dataToSend.tipoProductoId);
    formDataForAPI.append("admins_id", dataToSend.adminsId);

    if (producto) {
      const id = producto.id;


      const response = await updateProducto(id, formDataForAPI);
      console.log('Tipo producto actualizada:', response);
    } else {
      const response = await createProducto(formDataForAPI);
      console.log('Tipo producto creada:', response);
    }
    onProductoUpdated();
    closePopUp();
  };
    //#endregion
  
    //#region Handle de todos los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductoData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    //#endregion
  
    return (
    <Modal show={true} centered >

    <Modal.Header >
      <Modal.Title>{ producto ? <h4>Editar Tipo producto</h4> : <h4>Añadir Tipo producto</h4> }</Modal.Title>
    </Modal.Header>

    <Modal.Body>
        
    <FormGroup>
        <FormControl
            type="text"
            className="mb-2 "
            placeholder="Nombre"
            name="nombre"
            value={productoData.nombre}
            onChange={handleInputChange}
        />
        <FormControl
            type="text"
            className="mb-2 "
            placeholder="Desripcion"
            name="descripcion"
            value={productoData.descripcion}
            onChange={handleInputChange}
        />
        
        <FormSelect
            className="form-control mt-2"
            value={productoData.tipoProductoId}
            onChange={(e) =>
              setProductoData({ ...productoData, tipoProductoId: e.target.value })
            }
            >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
        </FormSelect>

        <FormSelect
            className="form-control mt-2 mb-2"
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
        </FormSelect>
        
        <FormControl 
            className="mb-3 form-control"
            type="file"
            name="imagen"
            onChange={(e) => setProductoData({...productoData, imagen: e.target.files[0]})}
        />

    </FormGroup>

    <Col row={3} className='d-flex justify-content-between'>
        { producto ? 
            <Button onClick={handleGuardar}>Guardar cambios</Button>
            :
            <Button onClick={handleGuardar}>Crear cliente</Button>
        }

    <Button  onClick={() => closePopUp()}>Canclear</Button>
    </Col>

    </Modal.Body>

    </Modal>
  );
};

export default ProductosCRUD_popup;
