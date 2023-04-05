import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Conadies = sequelize.define('conadies', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CODIGO_CONADIS:{
        type: DataTypes.STRING,
    },
    CEDULA:{
        type: DataTypes.STRING,
    },
    NOMBRES:{
        type: DataTypes.STRING,
    },
    APELLIDOS:{
        type: DataTypes.STRING,
    },
    TIPO_DISCAPACIDAD_ACTUAL:{
        type: DataTypes.STRING,
    },
    GRADO_DISCAPACIDAD_ACTUAL:{
        type: DataTypes.STRING,
    },
    PORCENTAJE_DISCA_ACTUAL:{
        type: DataTypes.STRING,
    },
    PERIODO_ADQUISICION:{
        type: DataTypes.STRING,
    },
    PERIODO_ADQUISICION_TIPO:{
        type: DataTypes.STRING,
    },
    PERIODO_ADQUISICION_SUBTIPO:{
        type: DataTypes.STRING,
    },
    EDAD:{
        type: DataTypes.STRING,
    },
    TELEFONO_CONVEN:{
        type: DataTypes.STRING,
    },
    TELEFONO_CELULAR:{
        type: DataTypes.STRING,
    },
    PROVINCIA:{
        type: DataTypes.STRING,
    },
    CANTON:{
        type: DataTypes.STRING,
    },
    PARROQUIA:{
        type: DataTypes.STRING,
    },
    SEXO:{
        type: DataTypes.STRING,
        },
    ESTADO_CALIFICACION:{
        type: DataTypes.INTEGER,
    }
     },{
    timestamps: false,
     });