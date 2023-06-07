
import * as path from 'path'
import { Server } from 'socket.io'
import { createServer } from 'http'
import express, { response } from 'express'
import fetch from 'node-fetch';


const server = express()
const http = createServer(server)
const io = new Server(http)

const port = process.env.PORT || 8000

const historySize = 50

let history = []

// Serveer client-side bestanden
server.use(express.static(path.resolve('public')))

// view engine
server.set('view engine', 'ejs')
server.set('views', './views')

// hoe json gebruikt moet worden
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// Stel afhandeling van formulieren in
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// SOCKET
//CHATROOM
io.on('connection', (socket) => {
    // Log de connectie naar console
    console.log(`user ${socket.id} connected`)
    // Stuur de historie door, let op: luister op socket, emit op io!
    io.emit('history', history)

    // Luister naar een message van een gebruiker
    socket.on('message', (message) => {
        // Check de maximum lengte van de historie
        while (history.length > historySize) {
            history.shift()
        }
        // Voeg het toe aan de historie
        history.push(message)
        // Verstuur het bericht naar alle clients, socket id toegevoegd, en content van het bericht toegevoegd
        io.emit('message', {uid: socket.id, message: message})
    })

    //  TEST 1 HOW MANY ACTIVE PLAYERS
    let activePlayers = 0;

    io.on('connection', (socket) => {
        socket.on('activePlayersCount', () => {
            let totalCount = socket.server.engine.clientsCount
            io.emit('activePlayersCountClient', totalCount);
        })

        socket.on('disconnect', () => {
            activePlayers--;
            console.log(`Client disconnected. Active players: ${activePlayers}`);
            io.emit('activePlayersCount', activePlayers);
        });
    });

    // Luister naar een disconnect van een gebruiker
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

// Maak een route voor de index
server.get('/', async function (req, res) {

    const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
    const url = ('https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes?first=3')

    const data = await fetch(url).then((response) => response.json())
    res.render('index', data)
})

// Route voor de stekjes page
server.get('/stek', async function (req, res) {

    const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
    const url = ('https://api.buurtcampus-oost.fdnd.nl/api/v1/stekjes')

    const data = await fetch(url).then((response) => response.json())
    res.render('stek', data)
})

// Route voor evenementen page
server.get('/evenementen', (request, response) => {
    response.render('evenementen')
})

// Route voor de contact page
server.get('/contact', (request, response) => {
    response.render('contact')
})

// Route voor de trivia begin page
server.get('/welkom', (request, response) => {
    response.render('welkom')
})

// Route voor de trivia vragen page
server.get('/loading', (request, response) => {
    response.render('loading')
})

// Route voor trivia
server.get('/trivia', (request, response) => {
    response.render('trivia')
})

// Route voor error
server.get('/error', (request, response) => {
    response.render('error')
})

// Route voor chatroom
server.get('/chatroom', (request, response) => {
    response.render('chatroom')
})

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

// Wanneer een client een verzoek stuurt naar het '/new'-eindpunt, zal de response.render()-functie worden opgeroepen.
server.get('/new', (request, response) => {
    response.render('admin')
})

server.post('/new', (request, response) => {
    // Het samenvoegen van de juiste API-eindpunten in de url-variabele.
    const baseUrl = "https://api.buurtcampus-oost.fdnd.nl/api/v1"
    const url = baseUrl + '/stekjes'
    // request.body.aanmelddatum gedefinieerd als de huidige datum en tijd in een ISO-string-formaat met behulp van toISOString().
    request.body.aanmelddatum = (new Date()).toISOString();
    // postJson()-functie opgeroepen, die een HTTP POST-verzoek verzendt naar de opgegeven API-eindpunt en wacht op een respons. De postJson()-functie stuurt de gegevens uit het POST-verzoek op als JSON-geformatteerde gegevens in de request.body.
    postJson(url, request.body).then((data) => {
        let newStekje = {...request.body}

        // Als het POST-verzoek succesvol was, wordt de client doorverwezen naar het hoofdmenu van de webapplicatie, zoals aangegeven door response.redirect('/').
        if (data.success) {
            response.redirect('/')

            // Als het POST-verzoek niet succesvol was, wordt er een foutbericht gegenereerd met behulp van de inhoud van de respons.
        } else {
            const errormessage = `${data.message}: Mogelijk komt dit door de slug die al bestaat.`
            // De newStekje variabele wordt gedefinieerd om een kopie van de gegevens van het POST-verzoek te bevatten, en deze variabele wordt gebruikt in de response.render()-functie om ervoor te zorgen dat de gebruiker zijn oorspronkelijke invoer kan zien nadat de foutmelding is weergegeven.
            const newdata = {error: errormessage, values: newStekje}
            console.log(data)
            console.log(JSON.stringify(data))
            response.render('admin', newdata)
        }
    })
})

// Start een http server op het ingestelde poortnummer en log de url
http.listen(port, () => {
    console.log('listening on http://localhost:' + port)
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











