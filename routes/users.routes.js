const express = require('express');

const usercontroller = require('../controllers/users.controller');

const authMiddlware = require('../middleware/auth.middleware');
const userMiddleware = require('../middleware/user.middleware');
const orderMiddleware = require('../middleware/orders.middleware');
const validationMiddleware = require('../middleware/validation.middleware');

const router = express.Router();

router.post(
  '/singup',
  userMiddleware.validEmailUniqueness,
  validationMiddleware.createUserValidation,
  usercontroller.signup
);

router.post(
  '/login',
  validationMiddleware.loginValidation,
  usercontroller.login
);

router.use(authMiddlware.protect);

router
  .route('/:id')
  .patch(
    userMiddleware.validExistUser,
    authMiddlware.protectAccountOwner,
    validationMiddleware.updateUserValidation,
    usercontroller.updatedUser
  )
  .delete(
    userMiddleware.validExistUser,
    authMiddlware.protectAccountOwner,
    usercontroller.deletedUser
  );

router.get('/orders', usercontroller.findAllOrders);
router.get(
  '/orders/:id',
  orderMiddleware.validExistOrder,
  usercontroller.getOrderUserById
);

module.exports = router;
