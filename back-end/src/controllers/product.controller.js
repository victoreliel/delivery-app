const ProductService = require('../services/product.service');

async function findAll(_, response) {
  try {
    const products = await ProductService.findAll();

    return response.status(200).json(products);
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

module.exports = {
  findAll,
};
