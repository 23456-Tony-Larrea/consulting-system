import React from 'react';
import image from '../../../assets/img/cards/image-not-found-scaled.png';
import { Input, InputGroup } from 'reactstrap';
import s from '../../../../src/module.css/user.module.css';
const usersHandicapped = ({ userHandicapped }) => {
  return (
    <div>
      <div className="row g-3">
        {userHandicapped.id ? (
          <div>
            <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
              Datos Personales
            </InputGroup>
            <InputGroup className="col-md-12 border-bottom mt-2">
            <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>Código CONADIS</label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.CEDULA || 'NO HAY DATOS'}`}
                  aria-label="Cedula"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>Cédula</label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.CEDULA || 'NO HAY DATOS'}`}
                  aria-label="Cedula"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>Nombres</label>
                <Input
                  type="text"
                  className="form-control "
                  value={`${userHandicapped.NOMBRES || 'NO HAY DATOS'}`}
                  placeholder="Nombres"
                  aria-label="Last name"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>Apellidos</label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.APELLIDOS || 'NO HAY DATOS'}`}
                  placeholder="Apellidos"
                  aria-label="Last name"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Tipo de discapacidad actual
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.TIPO_DISCAPACIDAD_ACTUAL || 'NO HAY DATOS'}`}
                  placeholder="Fecha de Nacimiento"
                  aria-label="Last name"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Grado de discapacidad actual
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.GRADO_DISCAPACIDAD_ACTUAL || 'NO HAY DATOS'}`}
                  aria-label="Genero"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Porcentaje de discapacidad actual
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${
                    userHandicapped.PORCENTAJE_DISCA_ACTUAL || 'NO HAY DATOS'
                  }`}
                  aria-label="Estado civil"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Período adquisición
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.PERIODO_ADQUISICION || 'NO HAY DATOS'}`}
                  aria-label="Cedula de conyuge"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                Período tipo de adquisición 
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.PERIODO_ADQUISICION_TIPO || 'NO HAY DATOS'}`}
                  aria-label="Cedula de conyuge"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Período tipo de Subtipo de adquisición 
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.PERIODO_ADQUISICION_SUBTIPO || 'NO HAY DATOS'}`}
                  aria-label="Cedula de conyuge"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Edad 
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.EDAD || 'NO HAY DATOS'}`}
                  aria-label="Cedula de conyuge"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
             
              
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Teléfono convencional 
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.TELEFONO_CONVEN || 'NO HAY DATOS'}`}
                  aria-label="Cedula de conyuge"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Teléfono celular 
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.TELEFONO_CELULAR || 'NO HAY DATOS'}`}
                  aria-label="Cedula de conyuge"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Provincia 
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.PROVINCIA || 'NO HAY DATOS'}`}
                  aria-label="Cedula de conyuge"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Cantón
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.CANTON || 'NO HAY DATOS'}`}
                  aria-label="Cedula de conyuge"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Parroquia 
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userHandicapped.PARROQUIA || 'NO HAY DATOS'}`}
                  aria-label="Cedula de conyuge"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className="col-form-label"></label>
                <Input style={{ opacity: 0, display: 'block' }} />
              </div>
            </InputGroup>
          </div>
        ) : (
          <div className="w-100 text-center">
            <p>No se encontraron resultados</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default usersHandicapped;
