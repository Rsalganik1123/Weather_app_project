const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/a601864b7ca24a8241e8d422a66e79c1/" + latitude + "," + longitude
    
    request({ url, json: true }, (error, {body})  => {
        if (error){
            callback("no location services available", undefined)
        } else if (body.error){
            callback("unable to find location", undefined)
        } else{
            
            callback(undefined, {
                currentTemp: body.currently.temperature, 
                tempHigh: body.daily.data[0].temperatureHigh, 
                tempLow: body.daily.data[0].temperatureLow, 
                rain: body.currently.precipProbability,
                summary: body.daily.data[0].summary, 
                uv: body.daily.data[0].uvIndex, 
                ozone: body.daily.data[0].ozone
            })
                //'It is currently ' + body.currently.temperature + " degrees out. With an expected high/low of " + body.daily.data[0].temperatureHigh + "/" + body.daily.data[0].temperatureLow +  " and a " + body.currently.precipProbability + " chance of rain. " + body.daily.data[0].summary + "\n" +  "This is a warning to slather on your sunscreen because the uv index is " + body.daily.data[0].uvIndex + " and the ozone is " + body.daily.data[0].ozone)
        }
    })
}          

module.exports = forecast 