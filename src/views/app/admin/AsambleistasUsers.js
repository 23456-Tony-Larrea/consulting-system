import React from 'react';
import { Input, InputGroup } from 'reactstrap';
import s from '../../../../src/module.css/user.module.css';
const AsambleistasUsers = ({ asambleista }) => {
  return (
    <div>
      <div className="row g-3">
        {asambleista.cedula ? (
          <div>
           <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
          Datos Personales
        </InputGroup>
        <InputGroup className="col-md-12 border-bottom mt-2">
        <div className="col-sm-4 ">
                <label className={`col-form-label ${s.label}`}>Cédula</label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${asambleista.cedula || 'NO HAY DATOS'}`}
                  aria-label="Cedula"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>Nombres y Apellidos</label>
                <Input
                  type="text"
                  className="form-control "
                  value={`${asambleista.nombre_consultado || 'NO HAY DATOS'}`}
                  placeholder="Nombres"
                  aria-label="Last name"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>Cargo</label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${asambleista.cargo_asambleista || 'NO HAY DATOS'}`}
                  placeholder="Fecha de Nacimiento"
                  aria-label="Last name"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>Partido</label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${asambleista.partido_asambleista || 'NO HAY DATOS'}`}
                  aria-label="Genero"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>Comisíon asambleístas</label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${
                    asambleista.comisiones_asambleista || 'NO HAY DATOS'
                  }`}
                  aria-label="Estado civil"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>Cargo de comisiones</label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${
                    asambleista.cargo_comisiones_asambleista || 'NO HAY DATOS'
                  }`}
                  aria-label="Cedula de conyuge"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>Correo</label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${asambleista.correo_asambleista || 'NO HAY DATOS'}`}
                  aria-label="Cedula de conyuge"
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
        ) : (
          <div className="text-center">
            <p>No se encontraron resultados</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AsambleistasUsers;
