const path = require('path')
const express = require('express')
const hbs = require('hbs', )

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather', 
        name: "Rebecca Salganik"
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: "Rebecca Salganik",
        profession: "coder", 
        level: "novice af"
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title:"Help", 
        name: "Rebecca Salganik",
        request: 'help', 
         
        profession: "coder", 
        level: "novice ****af***"
    })
})
app.get('/weather', (req,res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address!"
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) { 
                return res.send({error})
            }
            res.send({
                forecast: forecastData, 
                location, 
                address
                })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

    
})
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help',
        name: "Rebecca Salganik", 
        errorMsg: 'I cannot actually help you' 
    })
})
app.get('*', (req,res) => {
    res.render('404', {
        title: 'Help',
        name: "Rebecca Salganik", 
        errorMsg:"Something went wrong..."
    })
})

app.listen(port, () => {
    console.log("Server is up on port 3000")
})