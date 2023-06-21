# Schiphol flight tracker

Een applicatie om realtime in en uitgaande vluchten van en naar Schiphol airport te volgen.

![plantswap-performance-tablet_laptop_and_smartphone_mockup](https://github.com/joelle78/performance-matters-optimized-website/assets/112861375/c6ef207b-8881-40fc-9d47-39cacba36306)

## Inhoudsopgave

* [Beschrijving](#beschrijving)
* [Gebruik](#gebruik)
* [Kenmerken](#kenmerken)
* [Installatie](#installatie)
* [Bronnen](#bronnen)
* [Licentie](#licentie)

## Beschrijving

De opdracht van sprint 12 is een front-end applicatie te ontwikkelen waarbij de vertrekkende of aankomende vluchten van
Schiphol via dashboard worden weergegeven. Het doel van deze opdracht is om onze vaardigheden op het gebied van
front-end ontwikkeling te versterken en ervaring op te doen met het werken met externe API's.

## Gebruik

Het dashboard weergeeft vertrekkende of aankomende vluchten van of naar Schiphol. De data die worden weergegeven zijn:
- Datum
- Flight number
- Flight name
- Schedule time
- Terminal
- Route

De functies die nog toegevoegd worden aan de applicatie zijn:
- Een filterfunctie
- Een map die verschillende airports weergeeft
- Automatisch refreshen data API 

## Kenmerken

Voor deze applicatie is er gebruik gemaakt van:
- HTML
- CSS
- EJS
- Express
- Node
- Nodemon
- JSON
- Externe API
- Leaflet

## Installatie

**Om deze repository te installeren, volg je deze stappen:**

1. Klik op de groene knop "Code" en kopieer de URL van de repository.
2. Open een terminalvenster op je computer en navigeer naar de locatie waar je de repository wilt installeren.
3. Typ "git clone" gevolgd door de URL die je hebt gekopieerd en druk op Enter.
4. De repository wordt nu gekloond naar de opgegeven locatie op je computer.

Installatie Node, EJS, express en JSON:

1. Node.js-website (https://nodejs.org) en download de nieuwste versie van Node.js voor jouw besturingssysteem. Volg de
   installatie-instructies om Node.js op je computer te installeren.
2. Typ het volgende commando in de terminal om een nieuw package.json-bestand te maken: ```npm init -y```
3. Installeer Express en EJS door het volgende commando uit te voeren: ```npm install express ejs```
4. Maak een nieuw JavaScript-bestand in je projectmap. Je kunt het bijvoorbeeld server.js noemen.
5. initialiseer een Express-applicatie, stelt EJS in als de view engine, voegt een middleware toe om JSON-data te
   verwerken en definieert een route voor het renderen van een EJS-template.
6. Maak een nieuwe map in je projectmap genaamd views. Dit is waar je EJS-templates worden opgeslagen.

Er is ook gebruik gemaakt van een .env bestand waar de API key in word weergegeven.

## Bronnen

**Gebruik gemaakt van deze bronnen:**

- https://developer.schiphol.nl/
- https://leafletjs.com/
- https://nodejs.org/en
- https://expressjs.com/

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
