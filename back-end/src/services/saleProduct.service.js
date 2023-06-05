const { SaleProduct } = require('../database/models');

async function create({ id, productIds, quantities }) {
  await Promise.all(productIds.map(async (productId, index) => {
    await SaleProduct.create({ saleId: id, productId, quantity: quantities[index] });
  }));
}

module.exports = {
  create,
};
