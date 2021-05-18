const dotenv = require ('dotenv');

dotenv.config();

const env = process.env;
const jwt = require("../utils/jwt.js");

exports.type = (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
};

exports.time = (req, res, next) => {
  console.log('Time:', Date.now());
  next();
};

exports.url = (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}

exports.id =  (req, res, next) => {
  if (req.params.id == 0)
    next('route');
  else
    next();
}

exports.log = (req, res, next) => {
  console.log('LOGGED');
  next();
}

exports.setCurrentUser = (req, res, next) => {
  const token = req.header("authorization");
  jwt.verify(token, env.TOKEN_SECRET, (err, result) => {
    if (err)
      console.log(err.message);
    else
      res.send(result);
  })
}