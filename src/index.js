import app from './app.js';
import { sequelize } from './database/database.js';
import './models/Conadies.js'
async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log('Database is connected');
    await app.listen(app.get('port'),'192.168.1.36');
    console.log('Server on port', app.get('port'));
  } catch (error) {
    console.log(error);
  }
}
export default main();