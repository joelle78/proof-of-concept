import express from 'express'
import fetch from 'node-fetch';
import * as path from 'path'
import { createServer } from 'http'

// Maak een nieuwe express server aan
const server = express()
const http = createServer(server)

// Serveer client-side bestanden
server.use(express.static(path.resolve('public')))

// Stel ejs in als template engine en geef de 'views' map door
server.set('view engine', 'ejs')
server.set('views', './views')

// hoe json gebruikt moet worden
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// .env file configuration
// require('dotenv').config();

//.env file keys
// const api_key = process.env.API_KEY;


// Stel het poortnummer in en start express
server.set('port', process.env.PORT || 8000)
server.listen(server.get('port'), function () {
    console.log(`Application started on http://localhost:${server.get('port')}`)
})


// console.log(process.env);


// Maak een route voor de index
server.get('/', async function (req, res) {
    const url = ('https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes')
    const data = await fetch (url).then ((response)=> response.json())
    res.render('index', data)
})


// Maak een route voor de index
// const api_url = "https://api.schiphol.nl/public-flights";
//
// async function getFlights() {
//     const response = await fetch(api_url);
//     const data = await response.json();
//     console.log(data);
// }
//
// getFlights();

















