import React from 'react';
import image from '../../../assets/img/cards/image-not-found-scaled.png';
import { Input, InputGroup } from 'reactstrap';
import s from '../../../../src/module.css/user.module.css';
const userDoctors = ({ userDoctors }) => {
  return (
    <div>
      <div className="row g-3">
        {userDoctors.genero_doctor ? (
          <div>
            <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
              Datos personales
            </InputGroup>
            <InputGroup className="col-md-12 border-bottom mt-2">
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>Cédula</label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userDoctors.identity || 'NO HAY DATOS'}`}
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
                  value={`${userDoctors.nombre_consultado || 'NO HAY DATOS'}`}
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
                  value={`${userDoctors.apellido_consultado || 'NO HAY DATOS'}`}
                  placeholder="Apellidos"
                  aria-label="Last name"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Email doctor
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userDoctors.email_doctor || 'NO HAY DATOS'}`}
                  placeholder="Fecha de Nacimiento"
                  aria-label="Last name"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                   doctor
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userDoctors.telefono_doctor || 'NO HAY DATOS'}`}
                  aria-label="Genero"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Email trabajo doctor
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${
                    userDoctors.email_trabajo_doctor || 'NO HAY DATOS'
                  }`}
                  aria-label="Estado civil"
                  disabled
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-sm-4">
                <label className={`col-form-label ${s.label}`}>
                  Género del doctor
                </label>
                <Input
                  type="text"
                  className="form-control"
                  value={`${userDoctors.genero_doctor || 'NO HAY DATOS'}`}
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
export default userDoctors;
