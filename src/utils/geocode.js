const request = require('request')
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoicmViZWNjYXMiLCJhIjoiY2p4Mms5amltMDB0NzN6bTg4eGptaGVlaCJ9.P1uW4S-yIK80YvdiMV8QaA&limit=1"

    request({ url, json:true}, (error, {body}) => {
        if(error){
            callback('unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            callback('try another search', undefined)
        }else{
            callback(undefined, {
                latitude :body.features[0].center[1],
                longitude :body.features[0].center[0],
                location: body.features[0].place_name
            })
              
        }
    })

}

module.exports = geocode