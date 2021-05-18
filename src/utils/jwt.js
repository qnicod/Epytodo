const jwt = require('jsonwebtoken');
const dotenv = require ('dotenv');

dotenv.config();

const env = process.env;

module.exports = {
  generateTokenForUser: function(user) {
    return jwt.sign({
      id: user.id,
      name: user.name,
      firstname: user.firstname,
      password: user.password,
    },
    env.TOKEN_SECRET,
    {
      expiresIn: '1h'
    })
  }
};