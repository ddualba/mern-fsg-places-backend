const express = require('express');
const app = express();

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

// Init Middleware (BodyParser now built into express)
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

//Define Routes
app.use('/api/places', placesRoutes);
// app.use('/api/users', require('./routes/api/users'));

// Handle errors on unsupported routes
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occured' });
});

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
