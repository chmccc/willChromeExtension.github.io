async function getObs() {
  var info = await fetch(`https://ipinfo.io/json/`)
    .then(resp => resp.json());
  var obs = await fetch(`https://api.mesowest.net/v2/stations/nearesttime?&radius=${info.loc},100&limit=1&units=ENGLISH&token=804c1eb09a394255beef8e84b68123bf&vars=air_temp,wind_speed`)
  .then(resp => resp.json());
  console.log(obs);
  var tempOut;
  var windOut;
  var stnName = obs.STATION[0].NAME;
  var stnDist = obs.STATION[0].DISTANCE;
  console.log(stnName);
  console.log(stnDist);
  //populate variables with obs to display
  if (obs.STATION[0].OBSERVATIONS.air_temp_value_1 !== undefined) {
          tempOut = obs.STATION[0].OBSERVATIONS.air_temp_value_1.value;
        } else {tempOut = 'temp undefined';}
        console.log(tempOut);
        
  if (obs.STATION[0].OBSERVATIONS.wind_speed_value_1 !== undefined) {
          windOut = obs.STATION[0].OBSERVATIONS.wind_speed_value_1.value + ' MPH';
        } else {windOut = 'no wind data at site';}
        console.log(windOut);
        
  var outArr = ['Air temperature is ' +tempOut+' degrees F, wind speed: ' + windOut + '. Observations from the ' + stnName + ' site located ' + stnDist + ' miles from you.'];
  console.log(outArr);
  document.getElementById('obs').innerHTML=outArr;
  }
    
getObs()
