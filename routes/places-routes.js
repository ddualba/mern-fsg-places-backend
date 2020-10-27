const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

// Get place by placeId
router.get('/:pid', placesControllers.getPlaceById);

// Get places by userId
router.get('/user/:uid', placesControllers.getPlacesByUserId);

// Create a new Place
router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty()
  ],
  placesControllers.createPlace
);

// Update a place by Id
router.patch(
  '/:pid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  placesControllers.updatePlace
);

// Delete a place by Id
router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
