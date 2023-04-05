import React from 'react';
import image from '../../../assets/img/cards/image-not-found-scaled.png';
import { Input, InputGroup } from 'reactstrap';
import s from '../../../../src/module.css/user.module.css';
const UsersIess = ({ userIess }) => {
  return (
    <div>
      <div className="row g-3">
      {userIess.mail_iess ? ( 
        <div>
        <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
          Datos Personales
        </InputGroup>
        <InputGroup className="col-md-12 border-bottom mt-2">
        <div className="col-sm-4 ">
        <label className={`col-form-label ${s.label}` }>Cédula</label>
            <Input
              type="text"
              className="form-control"
              value={`${userIess.identity || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}` }>Nombres</label>
            <Input
              type="text"
              className="form-control "
              value={`${userIess.nombre_consultado || 'NO HAY DATOS'}`}
              placeholder="Nombres"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}` }>Apellidos</label>
            <Input
              type="text"
              className="form-control "
              value={`${userIess.apellido_consultado || 'NO HAY DATOS'}`}
              placeholder="Nombres"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}` }>Email</label>
            <Input
              type="text"
              className="form-control"
              value={`${userIess.mail_iess || 'NO HAY DATOS'}`}
              placeholder="Fecha de Nacimiento"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}` }>Teléfono</label>
            <Input
              type="text"
              className="form-control"
              value={`${userIess.telefono_iess || 'NO HAY DATOS'}`}
              aria-label="Genero"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}` }>Provincia</label>
            <Input
              type="text"
              className="form-control"
              value={`${userIess.provincia_iess || 'NO HAY DATOS'}`}
              aria-label="Estado civil"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}` }>Cantón</label>
            <Input
              type="text"
              className="form-control"
              value={`${userIess.canton_iess || 'NO HAY DATOS'}`}
              aria-label="Cedula de conyuge"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>

          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}` }>Parroquia</label>
            <Input
              type="text"
              className="form-control"
              value={`${userIess.parroquia_iess || 'NO HAY DATOS'}`}
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
):<div  className="w-100 text-center">
 <p>
   No se encontraron resultados
 </p>
 </div>}
  </div>
</div>        
    )
  }
export default UsersIess
