import { useState } from "react";
import TallasCRUD from "./CRUDS/TallasCRUD";
import TipoProductoCRUD from "./CRUDS/TipoProductoCRUD";
import MarcasCRUD from "./CRUDS/MarcasCRUD";
import ProductosCRUD from "./CRUDS/ProductosCRUD";

const Admin = () => {
  const [selectedEntity, setSelectedEntity] = useState("tallas");

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-white">Panel de Administración</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="text-white" htmlFor="entity">
              Selecciona una seccion:
            </label>
            <select
              id="entity"
              className="form-control"
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
            >
              <option value="tallas">Tallas</option>
              <option value="tipo-producto">Tipo de Producto</option>
              <option value="marcas">Marcas</option>
              <option value="productos">Productos</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {selectedEntity === "tallas" && <TallasCRUD />}
          {selectedEntity === "tipo-producto" && <TipoProductoCRUD />}
          {selectedEntity === "marcas" && <MarcasCRUD />}
          {selectedEntity === "productos" && <ProductosCRUD />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
