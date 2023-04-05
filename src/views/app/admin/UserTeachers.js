import React from 'react';
import image from '../../../assets/img/cards/image-not-found-scaled.png';
import { Input, InputGroup } from 'reactstrap';
import s from '../../../../src/module.css/user.module.css';
const UsersTeacher = ({ userTeacher }) => {
  return (
    <div>
    {userTeacher.zona_profesor ? (  
      <div className="row g-3">
        <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
          Datos Personales
        </InputGroup>
        <InputGroup className="col-md-12 border-bottom mt-2">
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Cédula</label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.identity || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Nombre</label>
            <Input
              type="text"
              className="form-control "
              value={`${userTeacher.nombre_consultado || 'NO HAY DATOS'}`}
              placeholder="Nombres"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Apellido</label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.apellido_consultado || 'NO HAY DATOS'}`}
              placeholder="Apellidos"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Zona de distrito
            </label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.zona_profesor || 'NO HAY DATOS'}`}
              placeholder="Fecha de Nacimiento"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Distrito educativo
            </label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.distrito_educativo || 'NO HAY DATOS'}`}
              aria-label="Genero"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Provincia</label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.provincia_profesor || 'NO HAY DATOS'}`}
              aria-label="Estado civil"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Cantón</label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.canton_profesor || 'NO HAY DATOS'}`}
              aria-label="Cedula de conyuge"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Institución</label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.institucion_profesor || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Teléfono</label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.telefono_profesor || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Célular</label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.celular_profesor || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Modalidad laboral
            </label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.modalidad_laboral || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Nivel</label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.nivel_profesor || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Cargo</label>
            <Input
              type="text"
              className="form-control"
              value={`${userTeacher.cargo_profesor || 'NO HAY DATOS'}`}
              aria-label="Cedula"
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
  ) :<div className="w-100 text-center">
  <p>
    No se encontraron resultados
  </p>
  </div>}
    </div>
     
     )
   }
    export default UsersTeacher

