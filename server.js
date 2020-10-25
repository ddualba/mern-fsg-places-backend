const express = require('express');
const app = express();

const placesRoutes = require('./routes/places-routes');

// Init Middleware (BodyParser now built into express)
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

//Define Routes
app.use('/api/places', placesRoutes);
// app.use('/api/users', require('./routes/api/users'));

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
