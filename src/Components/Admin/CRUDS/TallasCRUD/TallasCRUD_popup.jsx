import { useState, useEffect } from 'react';
import { Button, Col, FormControl, FormGroup, Modal } from 'react-bootstrap';
import { createTalla, updateTalla } from '../../../../Functions/TallasFunctions';

const TallasCRUD_popup = ({ talla, onTallaUpdated, closePopUp }) => {
  const [tallaData, setTallaData] = useState({
    nombre: '',
    dimensiones: '',
  });

    //#region UseEffect
    useEffect(() => {
        if (talla) {
            setTallaData({
                nombre: talla.nombre || '',
                dimensiones: talla.dimensiones || '',
            });
        }
    }, [talla]);
    //#endregion

    //#region Handle guardar cambios (CREAR O EDITAR)
    const handleGuardar = async () => {
    const dataToSend = {
      ...tallaData,
    };

    if (talla) {
      const id = talla.id;

      const response = await updateTalla(id, dataToSend);
      console.log('Marca actualizada:', response);
    } else {
      const response = await createTalla(dataToSend);
      console.log('Marca creada:', response);
    }
    onTallaUpdated();
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
      <Modal.Title>{ talla ? <h4>Editar talla</h4> : <h4>Añadir talla</h4> }</Modal.Title>
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
          type="text"
          className="mb-2 "
          placeholder="Dimensiones"
          name="dimensiones"
          value={tallaData.dimensiones}
          onChange={handleInputChange}
      />
    </FormGroup>

    <Col row={3} className='d-flex justify-content-between'>
        { talla ? 
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
