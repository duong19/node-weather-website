const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')

const port = process.env.PORT || 3000
const app = express()
const publicDirectory = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
app.use(express.static(publicDirectory))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Duong Nguyen'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Duong Nguyen'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Must give us your address'
        })
    }
    console.log(req.query)
    geocode(req.query.location, (error, { latitude, longtitude, location }) => {
        if (error) {
            return res.send({ error })
        }
        forecast({ latitude, longtitude, location }, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: data,
                location,
                address: req.query.location
            })
        })
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})