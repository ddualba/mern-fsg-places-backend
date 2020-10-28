const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = process.env.MAPBOX_TOKEN;

// dummy function, if you dont have access to geoCode API, return static coords
// function getCoordsForAddress(address) {
//   return {
//     lat: 40.7484474,
//     lng: -73.9871516
//   };
// }

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?types=address&limit=1&access_token=${API_KEY}`
  );

  const data = response.data;

  if (!data) {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  // https://docs.mapbox.com/help/glossary/geocoding/
  // https://docs.mapbox.com/api/search/#forward-geocoding

  const lng = data.features[0].geometry.coordinates[0];
  const lat = data.features[0].geometry.coordinates[1];

  const coordinates = {
    lat: lat,
    lng: lng
  };

  return coordinates;
}

module.exports = getCoordsForAddress;
