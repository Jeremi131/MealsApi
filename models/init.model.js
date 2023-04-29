const User = require('./user.model');
const Meal = require('./meal.model');
const Restaurant = require('./restaurant.model');
const Review = require('./review.model');
const Order = require('./order.model');

const initModel = () => {
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Meal.hasOne(Order);
  Order.belongsTo(Meal);

  Order.belongsTo(User);
  User.hasMany(Order);

  User.hasMany(Review);
  Review.belongsTo(User);

  Review.belongsTo(Restaurant);
  Restaurant.hasMany(Review);
};

module.exports = initModel;
