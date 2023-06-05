const md5 = require('md5');
const { User } = require('../database/models');

async function findAll() {
  const users = await User.findAll();

  return users;
}

async function findOneByEmail(email) {
  const user = await User.findOne({ where: { email } });

  return user;
}

async function findOneByName(name) {
  const user = await User.findOne({ where: { name } });

  return user;
}

async function create(object) {
  await User.create({ ...object, password: md5(object.password), role: 'customer' });
}

async function createBeingAdmin(object) {
  await User.create({ ...object, password: md5(object.password) });
}

async function destroy(id) {
  await User.destroy({ where: { id } });
}

module.exports = {
  findAll,
  findOneByEmail,
  findOneByName,
  create,
  createBeingAdmin,
  destroy,
};
