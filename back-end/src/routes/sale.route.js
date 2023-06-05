const { Router } = require('express');

const UserMiddleware = require('../middlewares/user.middleware');
const SaleController = require('../controllers/sale.controller');

const router = Router();

router.get('/sales', SaleController.getAll);

router.get('/seller/sales/:id', SaleController.findByPkIncludingSeller);
router.get('/product/sales/:id', SaleController.findByPkIncludingProduct);

router.get('/customer/orders/:id', SaleController.findAllByUserId);
router.get('/seller/orders/:id', SaleController.findAllBySellerId);

router.post('/sales', UserMiddleware.validateToken, SaleController.create);

router.patch('/sales/:id', SaleController.update);

module.exports = router;
