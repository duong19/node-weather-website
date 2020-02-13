const request = require('request')

const weather = (location, callback) => {
    const url = 'https://api.darksky.net/forecast/8c64fb18fcab0d219bb171b32dc0ef23/' + location.longtitude + ',' + location.latitude
    request({ url: url, json: true }, (error, data) => {
        if (error) {
            callback('Unable to connect')
        } else if (data.body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, data.body.daily.data[0].summary + 'It is ' + data.body.currently.temperature + ' in ' + location.location)
        }
    })
}

module.exports = weather