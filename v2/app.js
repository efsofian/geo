const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./geocode/weather.js');
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
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(ErrorMessage);
  } else {
    weather.getWeather(results.lattitude, results.longittude, (errorMess, restemp) => {
      if (errorMess) {
        console.log(errorMess);
      } else {
        console.log((restemp-32)/1.8000);
      }
    });
  }
});
