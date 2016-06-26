import config from 'config';
import * as db from './server/db';

db.create(config.get('Database'))
  .then(client => console.log("Base de datos creada correctamente"))
  .catch(err => console.warn("ERROR:", err))
  .then(() => process.exit());
