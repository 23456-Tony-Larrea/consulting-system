import React from 'react';
import image from '../../../assets/img/cards/image-not-found-scaled.png';
import { Input, InputGroup } from 'reactstrap';
import s from '../../../../src/module.css/user.module.css';
const userPolice = ({ userPolices }) => {
  return (
    <div>
      {userPolices.institucion ? ( 
      <div className="row g-3">
        <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
          Datos Personales
        </InputGroup>
        <InputGroup className="col-md-12 border-bottom mt-2">
        <div className="col-sm-4">
          <label className="col-form-label">Cédula</label>
          <Input
            type="text"
            className="form-control"
            value={`${userPolices.identity || 'NO HAY DATOS'}`}
            aria-label="Cedula"
            disabled
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label">Nombres</label>
          <Input
            type="text"
            className="form-control "
            value={`${userPolices.nombre_consultado || 'NO HAY DATOS'}`}
            placeholder="Nombres"
            aria-label="Last name"
            disabled
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label">Apellidos</label>
          <Input
            type="text"
            className="form-control"
            value={`${userPolices.apellido_consultado || 'NO HAY DATOS'}`}
            placeholder="Apellidos"
            aria-label="Last name"
            disabled
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label">Institución policial</label>
          <Input
            type="text"
            className="form-control"
            value={`${userPolices.institucion || 'NO HAY DATOS'}`}
            placeholder="Fecha de Nacimiento"
            aria-label="Last name"
            disabled
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label">Nivel policial</label>
          <Input
            type="text"
            className="form-control"
            value={`${userPolices.nivel_policial || 'NO HAY DATOS'}`}
            aria-label="Genero"
            disabled
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label">Cargo policial</label>
          <Input
            type="text"
            className="form-control"
            value={`${userPolices.cargo_policial || 'NO HAY DATOS'}`}
            aria-label="Estado civil"
            disabled
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label">Género</label>
          <Input
            type="text"
            className="form-control"
            value={`${userPolices.genero || 'NO HAY DATOS'}`}
            aria-label="Cedula de conyuge"
            disabled
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label">Email trabajo</label>
          <Input
            type="text"
            className="form-control"
            value={`${userPolices.email_trabajo || 'NO HAY DATOS'}`}
            aria-label="Cedula"
            disabled
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label">Email personal</label>
          <Input
            type="text"
            className="form-control"
            value={`${userPolices.email_personal || 'NO HAY DATOS'}`}
            aria-label="Cedula"
            disabled
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label"></label>
          <Input style={{opacity:0, display:"block"}}
          />
        </div>
        </InputGroup>
      </div>
  ) :<div>
  <p className="w-100 text-center">
    No se encontraron resultados
  </p>
  </div>}
    </div>
          
    )
  }
export default userPolice
