const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('./jwt.evaluation.key');

function sign(email) {
  const token = jwt.sign({ email }, secret, { algorithm: 'HS256', expiresIn: '7d' });

  return token;
}

function verify(token) {
  const data = jwt.verify(token, secret);

  return data;
}

module.exports = {
  sign,
  verify,
};
