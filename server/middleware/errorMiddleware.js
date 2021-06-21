export const notFound = (req, res, next) => {
 const error = new Error(`Not Found -${req.originalUrl}`);
 res.status(404);
 next(error);
};

export const errHandler = (err, req, res, next) => {
 const statusCode = req.statusCode === 200 ? 500 : res.statusCode;
 res.status(statusCode);
 res.json({
  data: {
   msg: err.message,
   stock: process.env.NODE_ENV === 'production' ? ' 🌵 🌵 ' : err.stock,
  },
 });
};

export const headerFunction = (req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
 res.header(
  'Access-Control-Allow-Headers',
  [
   'Origin',
   'X-Requested-With',
   'Content-Type',
   'Accept',
   'Authorization',
   'Accept-Language',
   'x-client-id',
   'x-client-secret',
   'x-client-device',
   'x-padosi-auth-token',
  ].join(', ')
 );
 if (req.method === 'OPTIONS') {
  return res.status(200).end();
 }
 next();
};
