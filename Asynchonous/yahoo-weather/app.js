/* eslint-disable no-console */
/* eslint-disable no-undef */
const yargs = require("yargs");
const weather = require("./weather-yahoo"); 

const argv = yargs
  .options({
    a:{
      demand: true,
      alias: "address",
      "describe": "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help","h")
  .argv;

let address = decodeURIComponent(argv.address);
weather.weatherInAddress(address, (messageErorr, result)=>{
  if(messageErorr){
    console(messageErorr);
  }else{
    console.log(result);
  }
});
// logWeatherInAddress(body);