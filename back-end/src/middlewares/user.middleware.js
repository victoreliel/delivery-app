const UserService = require('../services/user.service');
const { verify } = require('../helpers/jwt');

async function validateUser(request, response, next) {
  const { body: { email } } = request;

  const user = await UserService.findOneByEmail(email);

  if (user) {
    return response.status(409).end();
  }

  next();
}

async function validateToken(request, response, next) {
  try {
    const { authorization: token } = request.headers;

    const data = verify(token);

    if (data) {
      next();
    }
  } catch ({ message }) {
    return response.status(401).json({ message });
  }
}

module.exports = {
  validateUser,
  validateToken,
};
