import app from './app.js';
import { sequelize } from './database/database.js';
async function main() {
  try {
    console.log('Database is connected');
    await sequelize.sync({ force: false });
    await app.listen(app.get('port'),'192.168.1.36', {maxOldMemorySpace: 4096});
    console.log('Server on port', app.get('port'));
  } catch (error) {
    console.log(error);
  }
}
export default main();