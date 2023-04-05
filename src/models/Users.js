import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Users= sequelize.define('person_info',{
    
    cedula:{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre_completo:{
        type: DataTypes.STRING,
    },
    apellido_materno:{
        type: DataTypes.STRING,
    },
    apellido_paterno:{
        type: DataTypes.STRING,
    },
    primer_nombre:{
        type: DataTypes.STRING,
    },
    segundo_nombre:{
        type: DataTypes.STRING,
    },
    fecha_nacimiento:{
        type: DataTypes.STRING,
    },
    condicion_ciudadano:{
        type: DataTypes.STRING,
    },
    lugar_nacimiento:{
        type: DataTypes.STRING,
    },
    nacionalidad:{
        type: DataTypes.STRING,
    },
    estado_civil:{
        type: DataTypes.STRING,
    },
    conyuge:{
        type: DataTypes.STRING,
    },
    domicilio:{
        type: DataTypes.STRING,
    },
    calles_domicilio:{
        type: DataTypes.STRING,
    },
    numero_casa:{
        type: DataTypes.STRING,
    },
    fecha_matrimonio:{
        type: DataTypes.STRING,
    },
    lugar_matrimonio:{
        type: DataTypes.STRING,
    },
    apellidos:{
        type: DataTypes.STRING,
    },
    nombres:{
        type: DataTypes.STRING,
        },
    apellidos:{
        type: DataTypes.INTEGER,
    },
    provincia_domicilio:{
        type: DataTypes.STRING,
    },
    ciudad_domicilio:{
        type: DataTypes.STRING,
    },
    parroquia_domicilio:{
        type: DataTypes.STRING,
    },
    provincia_lugar_nacimiento:{
        type: DataTypes.STRING,
    },
    ciudad_lugar_nacimiento:{
        type: DataTypes.STRING,
    },
    parroquia_lugar_nacimiento:{
        type: DataTypes.STRING,
    }   
},
    {
        tableName:'person_info',
        timestamps: false,
        autoIncrement: false,
     }
);