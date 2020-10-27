const express = require('express');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

// Get place by placeId
router.get('/:pid', placesControllers.getPlaceById);

// Get places by userId
router.get('/user/:uid', placesControllers.getPlacesByUserId);

// Create a new Place
router.post('/', placesControllers.createPlace);

// Update a place by Id
router.patch('/:pid', placesControllers.updatePlace);

// Delete a place by Id
router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
