const { Router } = require('express');

const UserMiddleware = require('../middlewares/user.middleware');
const UserController = require('../controllers/user.controller');

const router = Router();

router.get('/users', UserController.findAll);

router.post('/login', UserController.findOneByEmail);
router.post('/register', UserMiddleware.validateUser, UserController.create);
router.post('/administrator/register', UserMiddleware.validateUser, UserController
  .createBeingAdmin);

router.delete('/users/:id', UserController.destroy);

module.exports = router;
