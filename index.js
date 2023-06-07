// Importeer express uit de node_modules map
import express from 'express'

// Maak een nieuwe express app aan
// Van express een variabel app gemaakt
const app = express()

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Informatie krijgen
// / routing voor de index
// Maak een route voor de index
app.get('/', async function (req, res) {
    const url = ('https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes')
    const data = await fetch (url).then ((response)=> response.json())
    res.render('index', data)
})

// app.get('/', (request, response) => {
//     response.render('index')
// })

// app.get('/reservation', (request, response) => {
//     // fetchen van data uit API, var veranderen naar data, de response met render functie voor de index de data erbij
//     fetchJson(stekjesUrl).then((data) => {
//         response.render('reservation', data)
//     })
// })

app.get('/workshops', (request, response) => {
    response.render('workshops')
})

app.get('/contact', (request, response) => {
    response.render('contact')
})

app.get('/hoe', (request, response) => {
    response.render('hoe')
})

// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */

// async function fetchJson(url) {
//     return await fetch(url)
//         .then((response) => response.json())
//         .catch((error) => error)
// }












