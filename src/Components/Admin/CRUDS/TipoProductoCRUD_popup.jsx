import { useState, useEffect } from 'react';
import { Button, Col, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { createTipoProducto, updateTipoProducto } from '../../../Functions/TipoProductosFunctions';

const TallasCRUD_popup = ({ tipoProducto, onTipoProductoUpdated, closePopUp }) => {
  const [tallaData, setTallaData] = useState({
    nombre: '',
    imagen: '',
  });

    //#region UseEffect
    useEffect(() => {
        if (tipoProducto) {
            setTallaData({
                nombre: tipoProducto.nombre || '',
                imagen: tipoProducto.imagen || '',
            });
        }
    }, [tipoProducto]);
    //#endregion

    //#region Handle guardar cambios (CREAR O EDITAR)
    const handleGuardar = async () => {
    const dataToSend = {
      ...tallaData,
    };
    
    const formDataForAPI = new FormData();
    formDataForAPI.append("nombre", dataToSend.nombre);
    formDataForAPI.append("imagen", dataToSend.imagen);

    if (tipoProducto) {
      const id = tipoProducto.id;


      const response = await updateTipoProducto(id, formDataForAPI);
      console.log('Tipo producto actualizada:', response);
    } else {
      const response = await createTipoProducto(formDataForAPI);
      console.log('Tipo producto creada:', response);
    }
    onTipoProductoUpdated();
    closePopUp();
  };
    //#endregion
  
    //#region Handle de todos los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTallaData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    //#endregion
  
    return (
    <Modal show={true} centered >

    <Modal.Header >
      <Modal.Title>{ tipoProducto ? <h4>Editar Tipo producto</h4> : <h4>Añadir Tipo producto</h4> }</Modal.Title>
    </Modal.Header>

    <Modal.Body>
        
    <FormGroup>
        <FormControl
            type="text"
            className="mb-2 "
            placeholder="Nombre"
            name="nombre"
            value={tallaData.nombre}
            onChange={handleInputChange}
        />
        <FormControl 
            className="mb-3 form-control"
            type="file"
            name="imagen"
            onChange={(e) => setTallaData({...tallaData, imagen: e.target.files[0]})}
        />
    </FormGroup>

    <Col row={3} className='d-flex justify-content-between'>
        { tipoProducto ? 
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

export default TallasCRUD_popup;
