import config from './config/config';
import app from './server/express';
// import dbController from './controllers/dbContorllers';

(async () => {
 console.info(`Starting App ......`);
 // await dbController();
 await app.listen(config.port, () => {
  try {
   console.info(`Server is running on the ${config.port}`);
  } catch (e) {
   console.error(e.message);
  }
 });
 console.info(`App Started .......`);
})();
