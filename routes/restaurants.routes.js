const express = require('express');

const restaurantController = require('../controllers/restaurants.controller');
const reviewController = require('../controllers/reviews.controller');

const validationMiddleware = require('../middleware/validation.middleware');
const restaurartMiddleware = require('../middleware/restaurants.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const reviewMiddleware = require('../middleware/reviews.middleware');

const router = express.Router();

router
  .route('/')
  .post(
    validationMiddleware.createRestaurantValidation,
    restaurantController.restaurantCreate
  )
  .get(restaurantController.findAllRestaurants);

router
  .route('/:id')
  .get(
    restaurartMiddleware.validExistRestaurant,
    restaurantController.findRestaurantById
  )
  .patch(
    restaurartMiddleware.validExistRestaurant,
    restaurantController.updatedRestaurant
  )
  .delete(
    restaurartMiddleware.validExistRestaurant,
    restaurantController.deletedRestaurant
  );

router.use(authMiddleware.protect);

router.post(
  '/reviews/:id',
  restaurartMiddleware.validExistRestaurant,
  reviewController.reviewCreate
);

router
  .route('/reviews/:restaurantId/:id')
  .patch(reviewMiddleware.validateReviewProperty, reviewController.reviewUpdate)
  .delete(
    reviewMiddleware.validateReviewProperty,
    reviewController.reviewDelete
  );

module.exports = router;
