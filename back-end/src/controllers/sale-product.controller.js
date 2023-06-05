const SaleProductService = require('../services/saleProduct.service');

async function create(request, response) {
  try {
    const { id, productIds, quantities } = request.body;

    await SaleProductService.create({ id, productIds, quantities });

    return response.status(201).end();
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

module.exports = {
  create,
};
