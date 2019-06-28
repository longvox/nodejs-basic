/* eslint-disable no-console */
/* eslint-disable no-undef */
const request = require("request");


const log = console.log.bind(this);  
const convertFtoC = (fah) => (fah-32)*5/9;
const convertBodyFtoC = (body) => {
  body.forecasts.map(value=>{
    value.low = convertFtoC(value.low);
    value.high = convertFtoC(value.high);
    return value;
  });
  return body;
};

function logWeatherInAddress(body){
  let location = body.location;
  let forecasts = body.forecasts; 
  log(`address: ${location.region}, ${location.city}, ${location.country}`);
  log(`low: ${forecasts[0].low}`);
  log(`high: ${forecasts[0].high}`);
  log(`weather: ${forecasts[0].text}`);
  return {
    address : `${location.region}, ${location.city}, ${location.country}`,
    low : forecasts[0].low,
    high : forecasts[0].high,
    weather : forecasts[0].text
  };
}

function weatherInAddress(address, callback){
  let url = `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${address}&format=json`;

  var app_id = "epE2sf7i";
  var consumer_key = "dj0yJmk9a3Z2YzhRV3NBcnRNJmQ9WVdrOVpYQkZNbk5tTjJrbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWVh";
  var consumer_secret = "e39c26c5d58f7f87eed814aa6c8b2d00cc055f8f";

  var oauth = {
    consumer_key,
    consumer_secret
  };

  let options = {
    url,
    headers: {
      "X-Yahoo-App-Id": app_id
    },
    oauth
  };

  let result;
  request.get(options, function(error, response, body){
    body = JSON.parse(body);
    if(error){
      callback("Cannot connect to Yahoo weather server");
    } else if(!body.location || !body.forecasts){
      callback("emty data");
    } else{
      result = convertBodyFtoC(body);
      callback(undefined, logWeatherInAddress(result));
    }
  });
  return result;
}


module.exports.weatherInAddress = weatherInAddress;
module.exports.logWeatherInAddress = logWeatherInAddress;