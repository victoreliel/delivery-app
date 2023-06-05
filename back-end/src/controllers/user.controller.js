const md5 = require('md5');
const UserService = require('../services/user.service');
const { sign } = require('../helpers/jwt');

async function findAll(_, response) {
  try {
    const users = await UserService.findAll();

    return response.status(200).json(users);
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function findOneByEmail(request, response) {
  try {
    const { body: { email, password } } = request;

    const user = await UserService.findOneByEmail(email);

    if (!user) {
      return response.status(404).end();
    }

    const token = sign(email);

    if (md5(password) === user.dataValues.password) {
      return response.status(200).json({
        name: user.dataValues.name,
        email: user.dataValues.email,
        role: user.dataValues.role,
        token,
      });
    }
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function create(request, response) {
  try {
    const {
      body: { name, email, password },
    } = request;

    await UserService.create({ name, email, password });

    return response.status(201).end();
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function createBeingAdmin(request, response) {
  try {
    const {
      body: { name, email, password, role },
    } = request;

    await UserService.createBeingAdmin({ name, email, password, role });

    return response.status(201).end();
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function destroy(request, response) {
  try {
    const { params: { id } } = request;

    await UserService.destroy(id);

    return response.status(204).end();
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

module.exports = {
  findAll,
  findOneByEmail,
  create,
  createBeingAdmin,
  destroy,
};
