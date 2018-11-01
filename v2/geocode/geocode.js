const request = require('request');

var geocodeAddress = (arg, callback) => {
  request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(arg),
    json: true
  }, (err, response, body) => {
    if (err) {
      callback('Unable to connect google servers.')
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that adress');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        lattitude: body.results[0].geometry.location.lat,
        longittude: body.results[0].geometry.location.lng
      })
    }
  });
}

module.exports = {
  geocodeAddress
}
  // // https://api.darksky.net/forecast/1d310f953b8b0275cda78c17d65e5772/48.83895330000001,2.3097373
  // // 1d310f953b8b0275cda78c17d65e5772
  // "lattitude": 48.83895330000001,
  //   "longittude": 2.3097373
