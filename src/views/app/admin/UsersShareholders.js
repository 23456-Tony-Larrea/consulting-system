import React from 'react';
import { Input, InputGroup } from 'reactstrap';
import s from '../../../../src/module.css/user.module.css';
const usersShareholders = ({ shareholders }) => {
  return (
    <div>
      <div className="row g-3">
        <InputGroup className={`col-md-12 col-md-14 ${s.titleUser}`}>
          Datos de la empresa
        </InputGroup>
        <InputGroup className="col-md-14 border-bottom mt-2">
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>RUC</label>
            <Input
              type="text"
              className="form-control"
              value={`${shareholders.RUC || 'NO HAY DATOS'}`}
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
              value={`${shareholders.NOMBRE || 'NO HAY DATOS'}`}
              placeholder="Nombres"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Situación Legal
            </label>
            <Input
              type="text"
              className="form-control"
              value={`${shareholders.SITUACION_LEGAL || 'NO HAY DATOS'}`}
              placeholder="Apellidos"
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
              value={`${shareholders.FECHA_CONSTITUCION || 'NO HAY DATOS'}`}
              placeholder="Apellidos"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Tipo
            </label>
            <Input
              type="text"
              className="form-control"
              value={`${shareholders.TIPO || 'NO HAY DATOS'}`}
              placeholder="Apellidos"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
       
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Pais</label>
            <Input
              type="text"
              className="form-control"
              value={`${shareholders.PAIS || 'NO HAY DATOS'}`}
              placeholder="Fecha de Nacimiento"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Región</label>
            <Input
              type="text"
              className="form-control"
              value={`${shareholders.REGION || 'NO HAY DATOS'}`}
              placeholder="Fecha de Nacimiento"
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
              value={`${shareholders.PROVINCIA || 'NO HAY DATOS'}`}
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
              value={`${shareholders.CANTON || 'NO HAY DATOS'}`}
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
              value={`${shareholders.CIUDAD || 'NO HAY DATOS'}`}
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
              value={`${shareholders.CALLE || 'NO HAY DATOS'}`}
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
              value={`${shareholders.NUMERO || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Intesección</label>
            <Input
              type="text"
              className="form-control"
              value={`${shareholders.INTERSECCION || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>
              Barrio
            </label>
            <Input
              type="text"
              className="form-control"
              value={`${shareholders.BARRIO || 'NO HAY DATOS'}`}
              placeholder="Fecha de Nacimiento"
              aria-label="Last name"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-sm-4">
            <label className={`col-form-label ${s.label}`}>Nombre del presidente</label>
            <Input
              type="text"
              className="form-control"
              value={`${shareholders.REPRESENTANTE || 'NO HAY DATOS'}`}
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
              value={`${shareholders.CARGO || 'NO HAY DATOS'}`}
              aria-label="Cedula"
              disabled
              style={{ borderRadius: '10px' }}
            />
          </div>
        </InputGroup>
        <div className="col-sm-4">
          <label className={`col-form-label ${s.label}`}>Región</label>
          <Input
            type="text"
            className="form-control"
            value={`${shareholders.REGION || 'NO HAY DATOS'}`}
            aria-label="Cedula"
            disabled
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-sm-4">
          <label className={`col-form-label ${s.label}`}>Capital suscrito</label>
          <Input
            type="text"
            className="form-control"
            value={`${shareholders.CAPITAL_SUSCRITO || 'NO HAY DATOS'}`}
            aria-label="Cedula"
            disabled
            style={{ borderRadius: '10px' }}
          />
        </div>
        <div className="col-sm-4">
          <label className="col-form-label"></label>
          <Input style={{ opacity: 0, display: 'block' }} />
        </div>
      </div>
    </div>
  );
};
export default usersShareholders;
