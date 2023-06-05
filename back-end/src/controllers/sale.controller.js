const SaleService = require('../services/sale.service');
const UserService = require('../services/user.service');

async function getAll(_request, response) {
  try {
    const sales = await SaleService.getAll();
    return response.status(200).json(sales);
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function findByPkIncludingSeller(request, response) {
  try {
    const { id } = request.params;

    const sale = await SaleService.findByPkIncludingSeller(id);

    return response.status(200).json(sale);
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function findByPkIncludingProduct(request, response) {
  try {
    const { id } = request.params;

    const sales = await SaleService.findByPkIncludingProduct(id);

    return response.status(200).json(sales);
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function create(request, response) {
  try {
    const { userName, sellerName, totalPrice, deliveryAddress, deliveryNumber } = request.body;

    const { dataValues: { id: userId } } = await UserService.findOneByName(userName);
    const { dataValues: { id: sellerId } } = await UserService.findOneByName(sellerName);

    const { dataValues: { id } } = await SaleService.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
    });

    return response.status(201).json({ id });
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function findAllByUserId(request, response) {
  try {
    const { id } = request.params;

    const sales = await SaleService.findAllByUserId(id);

    return response.status(200).json(sales);
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function findAllBySellerId(request, response) {
  try {
    const { id } = request.params;

    const sales = await SaleService.findAllBySellerId(id);

    return response.status(200).json(sales);
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
}

async function update(request, response) {
  try {
    const { id } = request.params;

    const { status } = request.body;

    await SaleService.update(id, status);

    return response.status(204).end();
  } catch ({ message }) {
    return response.status(500).json({ message });
  }
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
