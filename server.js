
import * as path from 'path'
import { createServer } from 'http'
import express, { response } from 'express'

const server = express()
const http = createServer(server)

const port = process.env.PORT || 8000


// Serveer client-side bestanden
server.use(express.static(path.resolve('public')))

// view engine
server.set('view engine', 'ejs')
server.set('views', './views')

// hoe json gebruikt moet worden
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// API QUICK START SCHIPHOL



// Maak een route voor de index
server.get('/', async function (req, res) {

    const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
    const url = ('https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes?first=3')

    const data = await fetch(url).then((response) => response.json())
    res.render('index', data)
})

// // Route voor evenementen page
// server.get('/evenementen', (request, response) => {
//     response.render('evenementen')


// De .get()-methode wordt gebruikt om een route pad te definiëren.
server.get('/:id', (request, response) => {
    // Het externe API-eindpunt is opgeslagen in de baseUrl-variabele, terwijl de id-parameter wordt opgehaald uit de URL van de client met behulp van request.params.id.
    const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
    let id = request.params.id
    let stekjeUrl = baseUrl + '/stekjes?id=' + id
    // de fetchJson()-functie opgeroepen, die het verzoek naar het externe API-eindpunt verzendt en wacht op een respons. Zodra de respons binnenkomt, wordt de data doorgegeven aan de response.render()-functie
    fetchJson(stekjeUrl).then((data) => {
        response.render('index', data)
    })
})

// // Wanneer een client een verzoek stuurt naar het '/new'-eindpunt, zal de response.render()-functie worden opgeroepen.
// server.get('/new', (request, response) => {
//     response.render('admin')
// })


// server.post('/new', (request, response) => {
//     // Het samenvoegen van de juiste API-eindpunten in de url-variabele.
//     const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
//     const url = baseUrl + '/stekjes'
//     // request.body.aanmelddatum gedefinieerd als de huidige datum en tijd in een ISO-string-formaat met behulp van toISOString().
//     request.body.aanmelddatum = (new Date()).toISOString();
//     // postJson()-functie opgeroepen, die een HTTP POST-verzoek verzendt naar de opgegeven API-eindpunt en wacht op een respons. De postJson()-functie stuurt de gegevens uit het POST-verzoek op als JSON-geformatteerde gegevens in de request.body.
//     postJson(url, request.body).then((data) => {
//         let newStekje = {...request.body}

// Start een http server op het ingestelde poortnummer en log de url
http.listen(port, () => {
    console.log('listening on http://localhost:' + port)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .catch((error) => error)
}

/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */
// export async function postJson(url, body) {
//     return await fetch(url, {
//         method: 'post', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'},
//     })
//         .then((response) => response.json())
//         .catch((error) => error)
// }











