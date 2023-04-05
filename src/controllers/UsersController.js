import {Op} from "sequelize"

export const gerSearchForFLName = async (req, res) => {
  const { apellido_paterno, apellido_materno, primer_nombre, segundo_nombre,cedula } = req.query;

  const where = {};
  if (apellido_paterno) {
    where.apellido_paterno = {
      [Op.like]: `${apellido_paterno}%`
    };
  }
  if (apellido_materno) {
    where.apellido_materno = {};
  }

  if (primer_nombre) {
    where.primer_nombre = {
  
    };
  }
  if (segundo_nombre) {
    where.segundo_nombre = {};
  }
  if(cedula){
    where.cedula = {
      [Op.like]: `${cedula}%`
    };
  }

  try {
    const users = await Users.findAll({ 
      where, 
      attributes: ['nombre_completo','apellido_paterno', 'apellido_materno', 'primer_nombre', 'segundo_nombre', 'cedula'],
     /*  order: [
        ['apellido_paterno', 'ASC'],
        ['apellido_materno', 'ASC'],
        ['primer_nombre', 'ASC'],
        ['segundo_nombre', 'ASC'],
      ], */
      limit: 1000,
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching for users.' });
  }
};
//insert Users
export const createUsers = async (req, res) => {
  const { cedula, nombre_completo, apellido_materno, apellido_paterno, primer_nombre, segundo_nombre, fecha_nacimiento, condicion_ciudadano, lugar_nacimiento, nacionalidad, estado_civil, conyuge, domicilio, calles_domicilio, numero_casa, fecha_matrimonio, lugar_matrimonio, apellidos, nombres } = req.body;
  try {
    let newUsers = await Users.create({
      cedula,
      nombre_completo,
      apellido_materno,
      apellido_paterno,
      primer_nombre,
      segundo_nombre,
      fecha_nacimiento,
      condicion_ciudadano,
      lugar_nacimiento,
      nacionalidad,
      estado_civil,
      conyuge,
      domicilio,
      calles_domicilio,
      numero_casa,
      fecha_matrimonio,
      lugar_matrimonio,
      apellidos,
      nombres
    }, {
      fields: ['cedula', 'nombre_completo', 'apellido_materno', 'apellido_paterno', 'primer_nombre', 'segundo_nombre' ]
    });
    if (newUsers) {
      return res.status(200).json({
        message: 'User created successfully',
        data: newUsers
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user.' });
  }
}
//get Users
export const getUsersByCedula = async(req,res)=>{ 
  const { cedula } = req.params;
  try {
    const users = await Users.findOne({ 
      where: { cedula }, 
      attributes: ['nombre_completo','apellido_paterno', 'apellido_materno', 'primer_nombre', 'segundo_nombre', 'cedula']
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching for users.' });
  }
}