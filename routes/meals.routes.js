const mealController = require('../controllers/meals.controller');
const express = require('express');

const validationsMiddleware = require('../middleware/validation.middleware');
const restaurantMiddleware = require('../middleware/restaurants.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const mealMiddleware = require('../middleware/meals.middleware');

const router = express.Router();

router.get('/', mealController.findAllMeals);

router
  .route('/:id')
  .post(
    authMiddleware.protect,
    restaurantMiddleware.validExistRestaurant,
    validationsMiddleware.createMealValidation,
    mealController.createMeal
  )
  .get(mealMiddleware.validExistMeal, mealController.findMealById)
  .patch(
    authMiddleware.protect,
    mealMiddleware.validExistMeal,
    mealController.updatedMeal
  )
  .delete(
    authMiddleware.protect,
    mealMiddleware.validExistMeal,
    mealController.deletedMeal
  );

module.exports = router;
