const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controllers/error.controller');

const userRoutes = require('./routes/users.routes');
const RestaurantRoutes = require('./routes/restaurants.routes');
const mealRoutes = require('./routes/meals.routes');
const orderRoutes = require('./routes/orders.routes');

const app = express();
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/restaurants', RestaurantRoutes);
app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/orders', orderRoutes);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`cannot find ${req.originalUrl} on this server! 🧨`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
