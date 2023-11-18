import { useState, useEffect } from 'react';
import { Button, Col, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { createMarca, updateMarca } from '../../../Functions/MarcasFunctions';

const MarcasCRUD_popup = ({ marca, onClienteUpdated, closePopUp }) => {
  const [marcaData, setMarcaData] = useState({
    nombre: '',
  });

    //#region UseEffect
    useEffect(() => {
        if (marca) {
            setMarcaData({
                nombre: marca.nombre || '',
            });
        }
    }, [marca]);
    //#endregion

    //#region Handle guardar cambios (CREAR O EDITAR)
    const handleGuardar = async () => {
    const dataToSend = {
      ...marcaData,
    };

    if (marca) {
      const id = marca.id;

      const response = await updateMarca(id, dataToSend);
      console.log('Marca actualizada:', response);
    } else {
      const response = await createMarca(dataToSend);
      console.log('Marca creada:', response);
    }
    onClienteUpdated();
    closePopUp();
  };
    //#endregion
  
    //#region Handle de todos los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMarcaData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    //#endregion
  
    return (
    <Modal show={true} centered >

    <Modal.Header >
      <Modal.Title>{ marca ? <h4>Editar marca</h4> : <h4>Añadir marca</h4> }</Modal.Title>
    </Modal.Header>

    <Modal.Body>
        
    <FormGroup>
        <FormControl
            type="text"
            className="mb-2 "
            placeholder="Nombre"
            name="nombre"
            value={marcaData.nombre}
            onChange={handleInputChange}
        />
    </FormGroup>

    <Col row={3} className='d-flex justify-content-between'>
        { marca ? 
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

export default MarcasCRUD_popup;
