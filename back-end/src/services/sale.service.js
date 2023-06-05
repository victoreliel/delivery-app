const { Product, Sale, SaleProduct, User } = require('../database/models');

async function getAll() {
  const sales = await Sale.findAll();
  return sales;
}

async function findByPkIncludingSeller(id) {
  const sale = await Sale.findByPk(id, { include: { model: User, as: 'seller' } });

  return sale;
}

async function findByPkIncludingProduct(id) {
  const sales = await SaleProduct
    .findAll({ include: { model: Product, as: 'products' }, where: { saleId: id } });

  return sales;
}

async function create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }) {
  const now = new Date();

  const sale = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: now.toISOString(),
    status: 'Pendente',
  });

  return sale;
}

async function findAllByUserId(id) {
  const sales = await Sale.findAll({ where: { userId: id } });

  return sales;
}

async function findAllBySellerId(id) {
  const sales = await Sale.findAll({ where: { sellerId: id } });

  return sales;
}

async function update(id, status) {
  await Sale.update({ status }, { where: { id } });
}

module.exports = {
  getAll,
  findByPkIncludingSeller,
  findByPkIncludingProduct,
  create,
  findAllByUserId,
  findAllBySellerId,
  update,
};
