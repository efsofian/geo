const yargs = require('yargs');
const axios = require('axios');
const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
}).help()
.alias('help', 'h')
.argv;

var adress = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(argv.address);
axios.get(adress).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }
    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
    var weatherUrl = 'https://api.darksky.net/forecast/1d310f953b8b0275cda78c17d65e5772/' + lat + ',' + long;

    return (axios.get(weatherUrl));

}).then((response) => {
  var temp = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(response.data.currently);
  console.log('Its Currently ' + temp + '. It feel like ' + apparentTemperature);
}).catch((e) => {
  if (e.code === 'ENOTFOUND')
  console.log('enable to connect to api');
  else {
    console.log(e.message);
  }
});
