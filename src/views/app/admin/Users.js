import React from 'react';
import { Input, InputGroup } from 'reactstrap';
import s from '../../../../src/module.css/user.module.css';
const convertGender = (gender) => {
  if (gender == 'MALE') {
    return 'MASCULINO';
  } else if (gender == 'FEMALE') {
    return 'FEMENINO';
  }
};

const user = ({ user }) => {
  return (
    <div> 
        {user.identity ? ( 
        <div>
      <div className="row g-3">
        <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
          Datos Personales
        </InputGroup>
        <InputGroup className="col-md-12 border-bottom mt-2">
          <div className="col-sm-4 ">
            <label className={`col-form-label ${s.label}`}>Cédula</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.identity || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Nombres</label>
            <Input
              col-sm-
              type="text"
              className="form-control "
              value={`${user.nombre_consultado || 'NO HAY DATOS'}`}
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
              value={`${user.apellido_consultado || 'NO HAY DATOS'}`}
              placeholder="Apellidos"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Fecha</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.fecha_nacimiento || 'NO HAY DATOS'}`}
              placeholder="Fecha de Nacimiento"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Género</label>
            <Input
              type="text"
              className="form-control"
              value={`${convertGender(user.genero) || 'NO HAY DATOS'}`}
              aria-label="Genero"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Estado civil</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.estado_civil || 'NO HAY DATOS'}`}
              aria-label="Estado civil"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
        </InputGroup>
      </div>
      </div>
       ): 
       <div className='col-md-12 square bg-primary rounded-0 border-bottom mt-3 justify-content-center' >
      <strong>
      No se encontraron resultados
       </strong>
       </div>
       }
     
        {user.ced_conyuge ? ( 
        <div>
        <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
          Datos del conyuge
        </InputGroup>
        <InputGroup className="col-md-14 border-bottom mt-3">
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Cédula</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.ced_conyuge || 'NO HAY DATOS'}`}
              aria-label="Cedula de conyuge"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Nombres</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.nombre_conyuge || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Apellidos</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.apellido_conyuge || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Fecha de nacimiento
            </label>
            <Input
              type="text"
              className="form-control"
              value={`${user.fecha_nacimiento_conyuge || 'NO HAY DATOS'}`}
              placeholder="Fecha de Nacimiento"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Género</label>
            <Input
              type="text"
              className="form-control"
              value={`${convertGender(user.genero_conyuge) || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Estado civil</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.estado_civil_conyuge || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
        </InputGroup>
        </div>
  ): 
  <div className='col-md-12 square bg-primary rounded-0 border-bottom mt-3 justify-content-center' >
 <p>Datos del conyuge</p>
 <strong>
    No se encontraron resultados
  </strong>
  </div>
  }
 
  {user.identity_padre ? (
  <div>
        <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
          Datos del padre
        </InputGroup>
        <InputGroup className="col-md-14 border-bottom mt-3">
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Cédula</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.identity_padre || 'NO HAY DATOS'}`}
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
              value={`${user.nombre_padre || 'NO HAY DATOS'}`}
              placeholder="Nombres del padre"
              aria-label="Nombres del padre"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Apellidos</label>
            <Input
              type="text"
              className="form-control "
              value={`${user.apellido_padre || 'NO HAY DATOS'}`}
              placeholder="Apellidos del padre"
              aria-label="Apellidos del padre"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Fecha nacimiento
            </label>
            <Input
              type="text"
              className="form-control "
              value={`${user.fecha_nacimiento_padre || 'NO HAY DATOS'}`}
              placeholder="Fecha de Nacimiento del padre"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Género</label>
            <Input
              type="text"
              className="form-control"
              value={`${convertGender(user.genero_padre) || 'NO HAY DATOS'}`}
              aria-label="Genero del padre"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Estado civil</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.estado_civil_padre || 'NO HAY DATOS'}`}
              aria-label="Estado civil del padre"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
        </InputGroup>
        </div>
  ): <div className='col-md-12 square bg-primary rounded-0 border-bottom mt-3 justify-content-center' >
  <p>Datos del padre</p>
  <strong>
     No se encontraron resultados
   </strong>
   </div>}
   {user.identity_madre ? (
  <div>
        <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
          Datos de la madre
        </InputGroup>
        <InputGroup className="col-md-14 border-dark">
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Cédula</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.identity_madre || 'NO HAY DATOS'}`}
              aria-label="Cedula de la madre"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Nombres</label>
            <Input
              type="text"
              className="form-control "
              value={`${user.nombre_madre || 'NO HAY DATOS'}`}
              placeholder="Nombres de la madre"
              aria-label="Nombres de la madre"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Apellidos</label>
            <Input
              type="text"
              className="form-control "
              value={`${user.apellido_madre || 'NO HAY DATOS'}`}
              placeholder="Apellidos de la madre"
              aria-label="Apellidos de la madre"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Fecha de nacimiento
            </label>
            <Input
              type="text"
              className="form-control"
              value={`${user.fecha_nacimiento_madre || 'NO HAY DATOS'}`}
              placeholder="Fecha de Nacimiento de la madre"
              aria-label="Fecha de Nacimiento de la madre"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Género</label>
            <Input
              type="text"
              className="form-control"
              value={`${convertGender(user.genero_madre) || 'NO HAY DATOS'}`}
              aria-label="Genero de la madre"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Estado civil</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.estado_civil_madre || 'NO HAY DATOS'}`}
              aria-label="Estado civil de la madre"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
        </InputGroup>
        </div>
 ): <div className='col-md-12 square bg-primary rounded-0 border-bottom mt-3 justify-content-center' >
 <p>Datos de la madre</p>
 <strong>
     No se encontraron resultados
   </strong>
  </div>}
  {user.ruc_cia_accionista ? (
    <div>
        <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
          Datos de la empresa{' '}
        </InputGroup>
        <InputGroup className="col-md-14 border-dark">
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>RUC</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.ruc_cia_accionista || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Nombre compañía
            </label>
            <Input
              type="text"
              className="form-control "
              value={`${user.nombre_compania_accionista || 'NO HAY DATOS'}`}
              placeholder="Nombres"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Fecha constitución
            </label>
            <Input
              type="text"
              className="form-control"
              value={`${user.fecha_compania_accionista || 'NO HAY DATOS'}`}
              placeholder="Apellidos"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Provincia</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.provincia_compania_accionista || 'NO HAY DATOS'}`}
              placeholder="Fecha de Nacimiento"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Cantón</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.canton_compania_accionista || 'NO HAY DATOS'}`}
              aria-label="Genero"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Ciudad</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.ciudad_compania_accionista || 'NO HAY DATOS'}`}
              aria-label="Estado civil"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
        </InputGroup>

        <InputGroup className="col-md-14 border-bottom mt-3">
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Calle</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.calle_compania_accionista || 'NO HAY DATOS'}`}
              aria-label="Cedula de conyuge"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Número</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.numero_compania_accionista || 'NO HAY DATOS'}`}
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
              value={`${user.telefono_compania_accionista || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Correo electrónico
            </label>
            <Input
              type="text"
              className="form-control"
              value={`${user.email_compania_accionista || 'NO HAY DATOS'}`}
              placeholder="Fecha de Nacimiento"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Descripción</label>
            <Input
              type="text"
              className="form-control"
              value={`${
                user.descripcion_compania_accionista || 'NO HAY DATOS'
              }`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Empleados</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.empleados_compania_accionista || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Región</label>
            <Input
              type="text"
              className="form-control"
              value={`${user.region_compania_accionista || 'NO HAY DATOS'}`}
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
    ): <div className='col-md-12 square bg-primary rounded-0 border-bottom mt-3 justify-content-center' >
    <p>Accionistas</p>
    <strong>
       No se encontraron resultados
     </strong>
     </div>}
     
 </div>        
       
     )
   }
 export default user