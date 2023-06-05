const { Router } = require('express');

const SaleProductController = require('../controllers/sale-product.controller');

const router = Router();

router.post('/sales-products', SaleProductController.create);

module.exports = router;
