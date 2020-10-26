const express = require('express');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();

// Get place by placeId
router.get('/:pid', placesControllers.getPlaceById);

// Get places by userId
router.get('/user/:uid', placesControllers.getPlaceByUserId);

router.post('/', placesControllers.createPlace);

module.exports = router;
