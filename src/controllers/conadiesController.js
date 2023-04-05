import { Conadies } from "../models/Conadies.js";

export const getConadies = async (req, res) => {
    try {
        const conadies = await Conadies.findAll();
        res.json({
        data: conadies,
        });
    } catch (error) {
        console.log(error);
    }
};
//create conadies 
export const createConadies = async (req, res) => {
    try {
        const { CODIGO_CONADIS, CEDULA, NOMBRES, APELLIDOS,
        TIPO_DISCAPACIDAD_ACTUAL, GRADO_DISCAPACIDAD_ACTUAL, PORCENTAJE_DISCA_ACTUAL, 
         PERIODO_ADQUISICION,
        PERIODO_ADQUISICION_TIPO, PERIODO_ADQUISICION_SUBTIPO, EDAD, 
        TELEFONO_CONVEN, TELEFONO_CELULAR, PROVINCIA, CANTON ,PARROQUIA,} = req.body;
        let newConadies = await Conadies.create(
        {
            CODIGO_CONADIS, CEDULA, NOMBRES, APELLIDOS,
            TIPO_DISCAPACIDAD_ACTUAL, GRADO_DISCAPACIDAD_ACTUAL, PORCENTAJE_DISCA_ACTUAL,
            PERIODO_ADQUISICION,
            PERIODO_ADQUISICION_TIPO, PERIODO_ADQUISICION_SUBTIPO, EDAD,
            TELEFONO_CONVEN, TELEFONO_CELULAR, PROVINCIA, CANTON ,PARROQUIA,
        },
        {
            fields: [
                "CODIGO_CONADIS", "CEDULA", "NOMBRES", "APELLIDOS",
                "TIPO_DISCAPACIDAD_ACTUAL", "GRADO_DISCAPACIDAD_ACTUAL", "PORCENTAJE_DISCA_ACTUAL",
                , "PERIODO_ADQUISICION",
                "PERIODO_ADQUISICION_TIPO", "PERIODO_ADQUISICION_SUBTIPO", "EDAD",
                "TELEFONO_CONVEN", "TELEFONO_CELULAR", "PROVINCIA", "CANTON", "PARROQUIA",
            ],
        }
        );
        if (newConadies) {
        return res.json({
            message: "Conadies created successfully",
            data: newConadies,
        });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message: "Something goes wrong",
        data: {},
        });
    }
};


//search by cedula 
export const getConadisBycedula = async (req, res) => {
    try {
        const { CEDULA } = req.params;
        const conadies = await Conadies.findAll({
        where: {
            CEDULA: CEDULA,
        },
        });
        res.json({
        data: conadies,
        });
    } catch (error) {
        console.log(error);
    }
}