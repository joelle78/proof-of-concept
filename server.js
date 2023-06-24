import express from 'express'
import fetch from 'node-fetch';
import * as path from 'path'
import cors from 'cors';
import ejs from 'ejs';
import axios from 'axios';

// .env file configuration
import {config} from 'dotenv';

config();

// Maak een nieuwe express server aan
const server = express()

// Serveer client-side bestanden
server.use(express.static(path.resolve('public')))

// Stel ejs in als template engine en geef de 'views' map door
server.set('view engine', 'ejs')
server.set('views', './views')

// hoe json gebruikt moet worden
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// Stel het poortnummer in en start express
server.set('port', process.env.PORT | 4000)
server.listen(server.get('port'), function () {
    console.log(`Application started on http://localhost:${server.get('port')}`)
})

async function getJSON() {
    try {
        const response = await fetch("https://api.schiphol.nl/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime", {
            mode: 'cors',
            headers: {
                "Accept": "application/json",
                "resourceversion": "v4",
                "app_id": "ced176ca",
                "app_key": process.env.API_KEY,
            }
        });

        const options = await response.json();
        console.log(options)
        console.log("Success:", options);
    } catch (error) {
        console.error("Error:", error);

    }
}

getJSON();

async function render() {
    try {
        const response = await fetch("https://api.schiphol.nl/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime", {
            mode: 'cors',
            headers: {
                "Accept": "application/json",
                "resourceversion": "v4",
                "app_id": "ced176ca",
                "app_key": process.env.API_KEY,
            }
        });

        // setInterval(render, 60000);

// Render de gegevens met behulp van EJS
//         const data = await response.json();
//         console.log(data); // Verify the structure of the data object
//
//         server.get('/', (request, response) => {
//             response.render('index', { flights: data.flights });
//         });
//
//     } catch (error) {
//         console.error("Er is een fout opgetreden bij het ophalen van de gegevens:", error);
//     }
// }

// render();

// Get the first 10 items from the 'flights' array
        const data = await response.json();
        console.log(data); // Verify the structure of the data object

        const firstTenFlights = data.flights.slice(0, 10);

        server.get('/', (request, response) => {
            response.render('index', {flights: firstTenFlights});
        });

        // Schedule the next render after 1 minute
        setInterval(render, 60000);

    } catch (error) {
        console.error("Er is een fout opgetreden bij het ophalen van de gegevens:", error);
    }
}

render();





















