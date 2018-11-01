const request = require('request');

var getWeather = (lat, long, callback) => {
  request({
    url: 'https://api.darksky.net/forecast/1d310f953b8b0275cda78c17d65e5772/' + lat + ',' + long,
    json: true
  }, (err, response, body) => {
    if (err) {
      callback('Unable to connect to weather app');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather');
    } else if (response.statusCode === 200) {
    callback(undefined, body.currently.temperature);
    }
  })
};

module.exports = {
  getWeather
}
