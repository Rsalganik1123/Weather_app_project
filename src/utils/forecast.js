const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/a601864b7ca24a8241e8d422a66e79c1/" + latitude + "," + longitude
    
    request({ url, json: true }, (error, {body})  => {
        if (error){
            callback("no location services available", undefined)
        } else if (body.error){
            callback("unable to find location", undefined)
        } else{
            callback(undefined, body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + " degrees out. And there is a " + body.currently.precipProbability + " chance of rain.")
        }
    })
}          

module.exports = forecast 