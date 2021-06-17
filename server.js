import config from './config/config';
import app from './server/express';
import dbController from './server/controllers/dbController';

const { port } = config;

(async () => {
 console.info(`Starting App ......`);
 await dbController();
 await app.listen(port, () => {
  try {
   console.info(`Express -> Server is running on the ${port}`);
  } catch (e) {
   console.error('Express -> ', e.message);
  }
 });
 console.info(`App Started .......`);
})();
