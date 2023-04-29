const orderController = require('../controllers/orders.controller');
const express = require('express');

const orderMiddleware = require('../middleware/order.middleware');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/', orderController.createOrder);
router.get('/me', orderController.findAllOrderUser);
router
  .route('/:id')
  .patch(orderMiddleware.validExistOrder, orderController.updatedOrder)
  .delete(orderMiddleware.validExistOrder, orderController.deletedOrder);

module.exports = router;
